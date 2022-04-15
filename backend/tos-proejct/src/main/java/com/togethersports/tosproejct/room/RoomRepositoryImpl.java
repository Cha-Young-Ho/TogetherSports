package com.togethersports.tosproejct.room;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.togethersports.tosproejct.room.dto.FieldsOfRoomList;

import com.togethersports.tosproejct.room.dto.RoomOfList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static com.togethersports.tosproejct.room.QRoom.room;

@Slf4j
@RequiredArgsConstructor
public class RoomRepositoryImpl implements RoomRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<Room> searchAll(FieldsOfRoomList fieldsOfRoomList, Pageable pageable) {

        log.info("partici pant = {}", room.participantCount.getMetadata().getElement().toString());
        log.info("1 = {}", room.participantCount.getMetadata().hashCode());
        log.info("2 = {}", room.participantCount.getClass().toString());
        log.info("3 = {}", room.participantCount.getMetadata().getParent());
        List<Room> result = queryFactory
                .selectFrom(room)
                .where(eqInterests(fieldsOfRoomList.getExercise()),
                    eqArea(fieldsOfRoomList.getArea())


                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(result);

    }
    //지역 필터링
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

    //종목 필터링(복수)
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



    private BooleanExpression inKeyWord(String keyWord){
        return keyWord == null ? null : room.roomTitle.contains(keyWord);
    }

    private BooleanExpression betweenTime(LocalDateTime start, LocalDateTime end){
        if(start == null){
            return null;
        }

        return room.startAppointmentDate.goe(start).and(room.endAppointmentDate.loe(end));
    }

//    private BooleanExpression

    private BooleanExpression participateCount(Integer participantCount){

        if(participantCount == null){
            return null;
        }
       
        return room.limitPeopleCount.lt((Integer)room.participantCount.getMetadata().getElement() + participantCount);
    }

    //시간 대


    //http://localhost:8080/api/room?
    // interest=%EC%B6%95%EA%B5%AC,%EC%95%BC%EA%B5%AC,%EB%86%8D%EA%B5%AC&
    // time=%EC%98%A4%ED%9B%84,%EC%98%A4%EC%A0%84&
    // customTimeStart=2021-01-03T12:11&customTimeEnd=2021-02-04T12:30&
    // filter=true&participantCount=0&page=0&size=20&sort=id,DESC

    //저도 querydsl 쓰면서 레코드에서 날짜가져와서 "다음날" 계산해야되는문제 있었는데 온갖삽질하다가

Expressions.dateTemplate(
    LocalDate::class.java,"ADDDATE({0},{1})", date, Expressions.asNumber(1)
            )

}

