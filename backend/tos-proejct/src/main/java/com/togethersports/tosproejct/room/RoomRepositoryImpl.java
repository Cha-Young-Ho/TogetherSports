package com.togethersports.tosproejct.room;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.togethersports.tosproejct.room.dto.FieldsOfRoomList;
import com.togethersports.tosproejct.tag.QTag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;
import java.util.List;

import static com.togethersports.tosproejct.room.QRoom.room;

@RequiredArgsConstructor
public class RoomRepositoryImpl implements RoomRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<Room> searchAll(FieldsOfRoomList fieldsOfRoomList, Pageable pageable) {
        List<Room> result = queryFactory
                .selectFrom(room)
                .where(eqInterests(
                    fieldsOfRoomList.getExercise()),
                    eqArea(fieldsOfRoomList.getArea()),
                    participateCount(fieldsOfRoomList.getParticipantCount(), fieldsOfRoomList.isContainNoAdmittance()),
                    betweenTime(fieldsOfRoomList.getStartAppointmentDate(), fieldsOfRoomList.getEndAppointmentDate(), fieldsOfRoomList.isContainTimeClosing()),
                    eqTitle(fieldsOfRoomList.getRoomTitle()),
                    eqContent(fieldsOfRoomList.getRoomContent())
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(sortRoomList(pageable))
                .fetch();

        return new PageImpl<>(result);

    }
    //방 제목 검색
    private BooleanExpression eqTitle(String searchTitle){
        return searchTitle == null ? null : room.roomTitle.contains(searchTitle);
    }

    //지역 필터링 검색
    private BooleanBuilder eqArea(List<String> areas){

        if(areas == null){
            return null;
        }

        BooleanBuilder booleanBuilder = new BooleanBuilder();

        for (String area : areas){
            booleanBuilder.or(room.roomArea.contains(area));
        }

        return booleanBuilder;
    }

    //종목 필터링(복수) 검색
    private BooleanBuilder eqInterests(List<String> interests){
        if(interests == null){
            return null;
        }

        BooleanBuilder booleanBuilder = new BooleanBuilder();

        for (String interest : interests){
            booleanBuilder.or(room.exercise.eq(interest));
        }

        return booleanBuilder;
    }


    //방 설명 검색
    private BooleanExpression eqContent(String content){
        return content == null ? null : room.roomContent.contains(content);
    }

    // 시간 대 검색
    private BooleanExpression betweenTime(LocalDateTime start, LocalDateTime end, boolean conTainTimeClosing){
        /*시간 마감 보기 설정 */
        if(conTainTimeClosing){
            //시간 검색 X
            if(start == null){
                return null;
            }
            //시간 검색 O
            return room.startAppointmentDate.between(start, end);
        }

        /*시간 마감 보기 설정 X*/
        //시간 검색 X
        if(start == null){
            return room.endAppointmentDate.gt(LocalDateTime.now());
        }
        //시간 검색 O
        return room.startAppointmentDate.between(start, end).and(room.endAppointmentDate.gt(LocalDateTime.now()));
    }


    /*입장 가능 인원 검색*/
    private BooleanExpression participateCount(Integer participantCount, boolean containNoAdmittance){
        //입장 마감 보기 시,
        if(containNoAdmittance){
            // 인원 검색을 하지 않았을 때
            if(participantCount == null){
                return null;
            }

            // 인원 검색을 했을 때
            return room.limitPeopleCount.gt(room.participantCount.add(participantCount));

        }

        /*입장 마감 안보기 시,*/
        // 인원 검색을 하지 않았을 때
        if(participantCount == null){
            return room.limitPeopleCount.gt(room.participantCount);
        }
        // 인원 검색을 했을 때
        return room.limitPeopleCount.gt(room.participantCount.add(participantCount));

    }

    // 정렬
    private OrderSpecifier<?> sortRoomList(Pageable page){
        //서비스에서 보내준 Pageable 객체에 정렬조건 null 값 체크
        if (!page.getSort().isEmpty()) {
            //정렬값이 들어 있으면 for 사용하여 값을 가져온다
            for (Sort.Order order : page.getSort()) {
                // 서비스에서 넣어준 DESC or ASC 를 가져온다.
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
                // 서비스에서 넣어준 정렬 조건을 스위치 케이스 문을 활용하여 셋팅하여 준다.
                switch (order.getProperty()){
                    case "start":
                        return new OrderSpecifier(direction, room.startAppointmentDate);
                    case "updatedTime":
                        return new OrderSpecifier(direction, room.updatedTime);
                    case "participant":
                        return new OrderSpecifier(direction, room.participantCount);
                }
            }
        }
        return new OrderSpecifier(Order.DESC, room.updatedTime);
    }



}

