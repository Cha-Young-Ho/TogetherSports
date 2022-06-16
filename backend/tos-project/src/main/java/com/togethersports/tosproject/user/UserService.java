package com.togethersports.tosproject.user;

import com.togethersports.tosproject.common.code.CommonCode;
import com.togethersports.tosproject.common.dto.Response;
import com.togethersports.tosproject.common.file.service.StorageService;
import com.togethersports.tosproject.common.file.util.Base64Decoder;
import com.togethersports.tosproject.common.file.util.NameGenerator;
import com.togethersports.tosproject.common.util.ParsingEntityUtils;
import com.togethersports.tosproject.interest.Interest;
import com.togethersports.tosproject.mannerpoint.MannerPointStatus;
import com.togethersports.tosproject.mannerpoint.UserMannerPointService;
import com.togethersports.tosproject.security.oauth2.model.OAuth2Provider;
import com.togethersports.tosproject.user.dto.*;
import com.togethersports.tosproject.user.exception.NicknameDuplicationException;
import com.togethersports.tosproject.user.exception.NotEnteredInformationException;
import com.togethersports.tosproject.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * <h1>UserService</h1>
 * <p>
 *     User 엔티티 CRUD 서비스 클래스
 * </p>
 * <p>
 *     User 엔티티 관련 직접적인 로직 수행 대신 각 담당 클래스간의 메소드 호출 흐름을 정의한다.
 * </p>
 *
 * @author seunjeon
 * @author younghoCha
 */

@RequiredArgsConstructor
@Service
public class UserService {

    private final StorageService storageService;
    private final UserRepository userRepository;
    private final Base64Decoder base64Decoder;
    private final NameGenerator nameGenerator;
    private final ParsingEntityUtils parsingEntityUtils;
    private final UserMannerPointService userMannerPointService;


    /**
     * 신규 계정을 등록한다.
     * @param user 새로 등록할 계정 엔티티
     * @return id 등록된 계정 식별자
     */
    public Long createUser(User user) {
        return userRepository.save(user).getId();
    }

    /**
     * 사용자 계정와 OAuth2 제공자 정보로 계정을 조회한다.
     * @param email 조회 대상 계정 이메일
     * @param provider 조회 대상 계정 OAuth2 제공자
     * @return 조회된 계정 엔티티
     * @throws UserNotFoundException 해당 계정이 없는 경우
     */
    public User findUser(String email, OAuth2Provider provider) {
        return userRepository.findByEmailAndProvider(email, provider)
                .orElseThrow(() -> new UserNotFoundException("계정이 존재하지 않습니다."));
    }

    /**
     * 이메일 중복 체크를 위한 메소드
     * @param nickname : 입력받은 이메일
     * @param user : 요청자 Entity
     * @return : 존재할경우 false, 존재하지 않을 경우 true
     */
    public boolean nicknameDuplicationCheck(String nickname, User user){
        if(user.getNickname().equals(nickname)){
            return true;
        }

        if(userRepository.existsByNickname(nickname)){
            return false;
        }
        return true;
    }

    /**
     * 다른 회원 정보 조회 메소드
     * @param otherUserId : 전달받은 user id
     * @return USerOfOtherInfo : 다른 회원 정보에 대한 DTO
     */
    public UserOfParticipantInfo getParticipantInfo(Long otherUserId){

        //유저 엔티티
        User userEntity = userRepository.findById(otherUserId)
                .orElseThrow(() -> new UserNotFoundException("해당 사용자를 찾을 수 없습니다."));

        //다른 회원이 정보를 입력했는지 여부
        checkInformation(userEntity);

        //다른 회원 정보 조회 DTO 리턴
        return UserOfParticipantInfo.builder()
                .id(userEntity.getId())
                .activeAreas(userEntity.getActiveAreas())
                .gender(userEntity.getGender())
                .interests(parsingEntityUtils.parsingInterestsEntityToString(userEntity.getInterests()))
                .userNickname(userEntity.getNickname())
                .mannerPoint(userEntity.getMannerPoint())
                .userProfileImagePath(userEntity.getUserProfileImage())
                .build();

    }

    public UserOfOtherInfo getOtherInfo(User requestUser, Long otherUserId){

        User requestUserEntity = userRepository.findById(requestUser.getId())
                .orElseThrow(() -> new UserNotFoundException("해당 사용자를 찾을 수 없습니다."));

        //유저 엔티티
        User targetUserEntity = userRepository.findById(otherUserId)
                .orElseThrow(() -> new UserNotFoundException("해당 사용자를 찾을 수 없습니다."));

        //다른 회원이 정보를 입력했는지 여부
        checkInformation(targetUserEntity);

        //다른 회원 정보 조회 DTO 리턴
        return UserOfOtherInfo.builder()
                .id(targetUserEntity.getId())
                .activeAreas(targetUserEntity.getActiveAreas())
                .gender(targetUserEntity.getGender())
                .interests(parsingEntityUtils.parsingInterestsEntityToString(targetUserEntity.getInterests()))
                .userNickname(targetUserEntity.getNickname())
                .mannerPoint(targetUserEntity.getMannerPoint())
                .userProfileImagePath(targetUserEntity.getUserProfileImage())
                .mannerType(userMannerPointService.getMannerPointStatus(requestUserEntity, targetUserEntity))
                .build();

    }




    //회원 정보 수정 메소드
    @Transactional
    public void modifyMyInfo(User user, UserOfModifyInfo userOfModifyInfo){
        if(!nicknameDuplicationCheck(userOfModifyInfo.getUserNickname(), user)){
            throw new NicknameDuplicationException("닉네임이 중복되었습니다.");
        }
        User findUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new UserNotFoundException("사용자가 존재하지 않습니다."));


        List<Interest> interests = parsingEntityUtils.parsingStringToInterestsEntity(userOfModifyInfo.getInterests());
        if(userOfModifyInfo.getUserProfileImage().getImageSource() == null){

            findUser.updateUser(userOfModifyInfo, interests, "https://together-sports.com/images/default_user_profile.jpeg");
            return;
        }

        String encodedImageSource = userOfModifyInfo.getUserProfileImage().getImageSource();
        byte[] imageSource = base64Decoder.decode(encodedImageSource);
        String fileName = nameGenerator.generateRandomName().concat(".")
                .concat(userOfModifyInfo.getUserProfileImage().getUserProfileExtension());
        String imagePath = storageService.store(imageSource, fileName);
        findUser.updateUser(userOfModifyInfo, interests, imagePath);
    }

    public UserOfMyInfo getMyInfo(Long id){
        User user =  userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("해당 사용자가 존재하지 않습니다."));


        List<String> parsedInterestList = parsingEntityUtils.parsingInterestsEntityToString(user.getInterests());

       return UserOfMyInfo.builder()
               .id(user.getId())
               .userBirth(user.getUserBirth())
               .activeAreas(user.getActiveAreas())
               .userProfileImagePath(user.getUserProfileImage())
               .userEmail(user.getEmail())
               .mannerPoint(user.getMannerPoint())
               .gender(user.getGender())
               .interests(parsedInterestList)
               .isInformationRequired(user.isInformationRequired())
               .userNickname(user.getNickname())
               .build();
    }

    public void checkInformation(User user){

        if(user.isInformationRequired()){
            throw new NotEnteredInformationException("추가 정보를 입력하지 않은 계정입니다.");
        }
    }

    public Response mannerPointUp(User requestUser, UserOfMannerPoint userOfMannerPoint){
        User targetUserEntity = userRepository.findById(userOfMannerPoint.getTargetUserId())
                .orElseThrow(() -> new UserNotFoundException("해당 유저를 찾을 수 없습니다."));

        Response response = userMannerPointService.doPointingMannerPoint(requestUser, targetUserEntity, userOfMannerPoint.getMannerPointStatus());


        return response;
    }


}
