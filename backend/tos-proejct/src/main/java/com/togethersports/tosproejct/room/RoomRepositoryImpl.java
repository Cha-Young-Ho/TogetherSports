package com.togethersports.tosproejct.room;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.togethersports.tosproejct.room.dto.FieldsOfRoomList;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
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
                .where(eqInterests(fieldsOfRoomList.getExercise()),
                    eqArea(fieldsOfRoomList.getArea()),
                    betweenTime(fieldsOfRoomList.getStartAppointmentDate(), fieldsOfRoomList.getEndAppointmentDate()),


                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(result);

    }
    //지역 필터링
    private BooleanBuilder eqArea(List<String> areas){

        if(areas.isEmpty()){
            return null;
        }

        BooleanBuilder booleanBuilder = new BooleanBuilder();

        for (String area : areas){
            booleanBuilder.or(room.roomArea.contains(area));
        }

        return booleanBuilder;
    }

    //종목 필터링(복수)
    private BooleanBuilder eqInterests(List<String> interests){
        if(interests.isEmpty()){
            return null;
        }

        BooleanBuilder booleanBuilder = new BooleanBuilder();

        for (String interest : interests){
            booleanBuilder.or(room.exercise.eq(interest));
        }

        return booleanBuilder;
    }



    private BooleanExpression inKeyWord(String keyWord){
        return keyWord == null ? null : room.roomTitle.contains(keyWord);
    }

    private BooleanExpression betweenTime(LocalDateTime start, LocalDateTime end){
        if(start == null){
            return null;
        }

        return room.startAppointmentDate.goe(start).and(room.endAppointmentDate.loe(end));
    }

    private BooleanExpression

//    private BooleanExpression participateCount(int participantCount){
//
//    }

    //시간 대


    //http://localhost:8080/api/room?
    // interest=%EC%B6%95%EA%B5%AC,%EC%95%BC%EA%B5%AC,%EB%86%8D%EA%B5%AC&
    // time=%EC%98%A4%ED%9B%84,%EC%98%A4%EC%A0%84&
    // customTimeStart=2021-01-03T12:11&customTimeEnd=2021-02-04T12:30&
    // filter=true&participantCount=0&page=0&size=20&sort=id,DESC

}
