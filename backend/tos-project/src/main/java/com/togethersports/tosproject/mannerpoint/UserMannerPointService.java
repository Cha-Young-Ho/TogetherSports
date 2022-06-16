package com.togethersports.tosproject.mannerpoint;

import com.togethersports.tosproject.common.code.CommonCode;
import com.togethersports.tosproject.common.dto.Response;
import com.togethersports.tosproject.mannerpoint.code.MannerPointCode;
import com.togethersports.tosproject.mannerpoint.dto.MannerPointOfPointing;
import com.togethersports.tosproject.mannerpoint.exception.NotDownPointingMannerPointException;
import com.togethersports.tosproject.mannerpoint.exception.NotUpPointingMannerPointException;
import com.togethersports.tosproject.user.User;
import com.togethersports.tosproject.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserMannerPointService {

    private final UserMannerPointRepository userMannerPointRepository;

    public MannerPointStatus checkMannerPointStatus(Optional<UserMannerPoint> userMannerPointEntity){


        if(!userMannerPointEntity.isPresent()){
        return MannerPointStatus.DEFAULT;
        }

        return userMannerPointEntity.get().getMannerPointStatus();
    }

    public Response doPointingMannerPoint(User requestUser, User targetUser, MannerPointStatus request){
        Optional<UserMannerPoint> userMannerPointEntity = userMannerPointRepository.findByUserAndTargetUser(requestUser, targetUser);
        MannerPointStatus actualMannerPointStatus = checkMannerPointStatus(userMannerPointEntity);

        if(requestUser.getId() == targetUser.getId()){
            return Response.of(MannerPointCode.FAIL_SELF_MANNER_POINT, null);
        }

        // 상대방에게 매너지수에 관한 작업을 하지 않은 상태
        if(actualMannerPointStatus.equals(MannerPointStatus.DEFAULT)){
            // 매너지수 내리기 요청
            if(request.equals(MannerPointStatus.DOWN)){
                //매너지수 내리기
                targetUser.updateMannerPoint(-1);

                //엔티티 생성
                UserMannerPoint newUserMannerPointEntity = UserMannerPoint.of(requestUser, targetUser, MannerPointStatus.DOWN);

                //db 등록
                userMannerPointRepository.save(newUserMannerPointEntity);

                return Response.of(MannerPointCode.MANNER_POINT_DOWN, MannerPointOfPointing.builder().mannerPoint(targetUser.getMannerPoint()).id(targetUser.getId()).build());
            }
            // 매너지수 올리기 요청
            if(request.equals(MannerPointStatus.UP)){
                //매너지수 올리기
                targetUser.updateMannerPoint(1);
                //엔티티 생성
                UserMannerPoint newUserMannerPointEntity = UserMannerPoint.of(requestUser, targetUser, MannerPointStatus.UP);
                //db 등록
                userMannerPointRepository.save(newUserMannerPointEntity);

                return Response.of(MannerPointCode.MANNER_POINT_UP, MannerPointOfPointing.builder().mannerPoint(targetUser.getMannerPoint()).id(targetUser.getId()).build());
            }
        }
        // 이미 매너지수 올린 상태
        if(actualMannerPointStatus.equals(MannerPointStatus.UP)){
            //매너지수 올리기
            if(request.equals(MannerPointStatus.UP)){

                return Response.of(MannerPointCode.FAIL_MANNER_POINT_UP, null);

            }
            //매너지수 내리기
            if(request.equals(MannerPointStatus.DOWN)){
                doPointing(targetUser, -1, userMannerPointEntity);

                return Response.of(MannerPointCode.MANNER_POINT_DOWN, MannerPointOfPointing.builder().mannerPoint(targetUser.getMannerPoint()).id(targetUser.getId()).build());

            }
        }
        // 이미 매너지수 내린 상태
        if(actualMannerPointStatus.equals(MannerPointStatus.DOWN)){
            // 매너지수 내리기

            if(request.equals(MannerPointStatus.DOWN)){

                return Response.of(MannerPointCode.FAIL_MANNER_POINT_DOWN, null);

            }
            // 매너지수 올리기 DOWN -> DEFAULT(db 삭제)
            if(request.equals(MannerPointStatus.UP)){
                doPointing(targetUser, 1, userMannerPointEntity);

                return Response.of(MannerPointCode.MANNER_POINT_UP, MannerPointOfPointing.builder().mannerPoint(targetUser.getMannerPoint()).id(targetUser.getId()).build());
            }
        }

        return Response.of(CommonCode.BAD_REQUEST, null);
    }

    public MannerPointStatus getMannerPointStatus(User requestUserEntity, User targetUserEntity){

        return checkMannerPointStatus(userMannerPointRepository.findByUserAndTargetUser(requestUserEntity, targetUserEntity));

    }

    public void doPointing(User targetUser, int mannerPoint, Optional<UserMannerPoint> userMannerPointEntity){
        targetUser.updateMannerPoint(mannerPoint);
        userMannerPointRepository.delete(userMannerPointEntity.get());
    }





}
