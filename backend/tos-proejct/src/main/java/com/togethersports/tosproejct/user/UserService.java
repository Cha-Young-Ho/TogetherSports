package com.togethersports.tosproejct.user;

import com.togethersports.tosproejct.area.ActiveArea;
import com.togethersports.tosproejct.area.ActiveAreaRepository;
import com.togethersports.tosproejct.common.file.service.StorageService;
import com.togethersports.tosproejct.common.file.util.Base64Decoder;
import com.togethersports.tosproejct.common.file.util.NameGenerator;
import com.togethersports.tosproejct.common.util.ParsingEntityUtils;
import com.togethersports.tosproejct.interest.Interest;
import com.togethersports.tosproejct.interest.InterestRepository;
import com.togethersports.tosproejct.user.dto.UserOfModifyInfo;
import com.togethersports.tosproejct.user.dto.UserOfMyInfo;
import com.togethersports.tosproejct.user.dto.UserOfOtherInfo;
import com.togethersports.tosproejct.user.exception.NicknameDuplicationException;
import com.togethersports.tosproejct.user.exception.NotEnteredInformationException;
import com.togethersports.tosproejct.user.exception.UserNotFoundException;
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
 *     User 엔티티 관련 직적적인 로직 수행 대신 각 담당 클래스간의 메소드 호출 흐름을 정의한다.
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
    private final ActiveAreaRepository activeAreaRepository;
    private final InterestRepository interestRepository;
    // 사용자 계정 추가정보 최초 설정

    /**
     * 이메일 중복 체크를 위한 메소드
     * @param nickname : 입력받은 이메일
     * @return : 존재할경우 false, 존재하지 않을 경우 true
     */
    public boolean nicknameDuplicationCheck(String nickname){
        // 존재할 경우
        if(userRepository.existsByNickname(nickname)){
            return false;
        }

        //존재하지 않을 경우
        return true;
    }

    /**
     * 다른 회원 정보 조회 메소드
     * @param otherUserId : 전달받은 user id
     * @return USerOfOtherInfo : 다른 회원 정보에 대한 DTO
     */
    public UserOfOtherInfo getOtherInfo(Long otherUserId){
        //유저 엔티티
        User userEntity = userRepository.findById(otherUserId)
                .orElseThrow(() -> new UserNotFoundException("해당 사용자를 찾을 수 없습니다."));

        //다른 회원이 정보를 입력했는지 여부
        checkInformation(userEntity);

        //다른 회원 정보 조회 DTO 리턴
        return UserOfOtherInfo.builder()
                .activeAreas(parsingEntityUtils.parsingAreasEntityToString(userEntity.getActiveAreas()))
                .gender(userEntity.getGender())
                .interests(parsingEntityUtils.parsingInterestsEntityToString(userEntity.getInterests()))
                .userNickname(userEntity.getNickname())
                .mannerPoint(userEntity.getMannerPoint())
                .build();

    }


    //회원 정보 수정 메소드
    @Transactional
    public void modifyMyInfo(Long id, UserOfModifyInfo userOfModifyInfo){
        if(userRepository.existsByNickname(userOfModifyInfo.getUserNickname())){
            throw new NicknameDuplicationException("닉네임이 중복되었습니다.");
        }
        User findUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("사용자가 존재하지 않습니다."));

        List<ActiveArea> activeAreas = parsingEntityUtils.parsingStringToActivesEntity(userOfModifyInfo.getActiveAreas());
        List<Interest> interests = parsingEntityUtils.parsingStringToInterestsEntity(userOfModifyInfo.getInterests());
        if(userOfModifyInfo.getUserProfileImage().getImageSource().equals("정보 없음")){

            findUser.updateUser(userOfModifyInfo, activeAreas, interests, "http://localhost:8080/Users/chayeongho/Desktop/스크린샷 2022-04-13 오후 6.51.46.png");
            return;
        }

        String encodedImageSource = userOfModifyInfo.getUserProfileImage().getImageSource();
        byte[] imageSource = base64Decoder.decode(encodedImageSource);
        String fileName = nameGenerator.generateRandomName().concat(".")
                .concat(userOfModifyInfo.getUserProfileImage().getUserProfileExtension());
        String imagePath = storageService.store(imageSource, fileName);
        findUser.updateUser(userOfModifyInfo, activeAreas, interests, imagePath);
    }

    public UserOfMyInfo getMyInfo(Long id){
        User user =  userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("해당 사용자가 존재하지 않습니다."));

        List<String> parsedAreaList = parsingEntityUtils.parsingAreasEntityToString(user.getActiveAreas());
        List<String> parsedInterestList = parsingEntityUtils.parsingInterestsEntityToString(user.getInterests());

       return UserOfMyInfo.builder()
               .id(user.getId())
               .userBirth(user.getUserBirth())
               .activeAreas(parsedAreaList)
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
        if(user.isFirst()){
            throw new NotEnteredInformationException("추가 정보를 입력하지 않은 계정입니다.");
        }
    }
}
