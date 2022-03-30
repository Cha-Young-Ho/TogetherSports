package com.togethersports.tosproejct.account;

import com.togethersports.tosproejct.account.dto.UserOfInitInfo;
import com.togethersports.tosproejct.account.exception.UserNotFoundException;
import com.togethersports.tosproejct.area.ActiveArea;
import com.togethersports.tosproejct.area.ActiveAreaRepository;
import com.togethersports.tosproejct.common.file.service.StorageService;
import com.togethersports.tosproejct.common.file.util.Base64Decoder;
import com.togethersports.tosproejct.common.file.util.NameGenerator;
import com.togethersports.tosproejct.common.util.ParsingEntityUtils;
import com.togethersports.tosproejct.interest.Interest;
import com.togethersports.tosproejct.interest.InterestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    // fixme 매핑 방향 변화에 따른 로직 수정, null 예외 처리
    @Transactional
    public void initUserInfo(Long id, UserOfInitInfo initialInfo) {
        List<ActiveArea> activeAreas = null;
        List<Interest> interests = null;
        String encodedImageSource = null;
        String imagePath = null;
        User findUser = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("사용자가 존재하지 않습니다."));

        // ActiveArea 설정 (활동지역), String List -> ActiveAreas List
        if(initialInfo.getActiveAreas() != null) {
            activeAreas =
                    parsingEntityUtils.parsingStringToActivesEntity(initialInfo.getActiveAreas());
        }

        if(initialInfo.getInterests() != null) {
            // Interest 설정 (관심종목), String List -> Interests List
            interests =
                    parsingEntityUtils.parsingStringToInterestsEntity(initialInfo.getInterests());
        }

        if(initialInfo.getUserProfileImage().getImageSource() != null) {
            // 프로필 이미지 저장
            encodedImageSource = initialInfo.getUserProfileImage().getImageSource();
            byte[] imageSource = base64Decoder.decode(encodedImageSource);
            String extension = initialInfo.getUserProfileImage().getUserProfileExtension();
            String fileName = nameGenerator.generateRandomName().concat(".").concat(extension);
            imagePath = storageService.store(imageSource, fileName);
        }
        if(imagePath == null){
            findUser.initUser(initialInfo.getGender(), initialInfo.getUserBirth(), activeAreas, interests);
            return;
        }

        // 계정에 변경 사항 적용
        findUser.initUser(imagePath, initialInfo.getGender(), initialInfo.getUserBirth(), activeAreas, interests);

    }

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

    public void saveActiveArea(List<ActiveArea> activeAreas){

        for(ActiveArea activeArea : activeAreas){
            activeAreaRepository.save(activeArea);
        }
    }
    public void saveInterests(List<Interest> interests) {
        for (Interest interest : interests) {
            interestRepository.save(interest);
        }
    }
    public User getOtherInfo(Long id){
        //유저 엔티티
        Optional<User> userEntity = userRepository.findById(id);

        //다른 회원 정보 조회 DTO
        return null;

    }
}
