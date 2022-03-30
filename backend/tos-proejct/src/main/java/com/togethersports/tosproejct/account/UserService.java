package com.togethersports.tosproejct.account;

import com.togethersports.tosproejct.account.dto.UserOfInitInfo;
import com.togethersports.tosproejct.account.exception.UserNotFoundException;
import com.togethersports.tosproejct.area.ActiveArea;
import com.togethersports.tosproejct.area.ActiveAreaRepository;
import com.togethersports.tosproejct.common.file.service.StorageService;
import com.togethersports.tosproejct.common.file.util.Base64Decoder;
import com.togethersports.tosproejct.common.file.util.NameGenerator;
import com.togethersports.tosproejct.interest.Interest;
import com.togethersports.tosproejct.interest.InterestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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
 */
@RequiredArgsConstructor
@Service
public class UserService {

    private final StorageService storageService;
    private final AccountRepository accountRepository;
    private final ActiveAreaRepository activeAreaRepository;
    private final InterestRepository interestRepository;
    private final Base64Decoder base64Decoder;
    private final NameGenerator nameGenerator;

    // 사용자 계정 추가정보 최초 설정
    @Transactional
    public void initUserInfo(Long id, UserOfInitInfo initialInfo) {
        Account findAccount = accountRepository.findById(id).orElseThrow(() -> new UserNotFoundException("사용자가 존재하지 않습니다."));

        // ActiveArea 설정 (활동지역)
        List<ActiveArea> activeAreas = initialInfo.getActiveAreas().stream()
                .map(activeArea -> ActiveArea.createActiveArea(findAccount, activeArea))
                .collect(Collectors.toList());
        activeAreaRepository.saveAll(activeAreas);

        // Interest 설정 (관심종목)
        List<Interest> interests = initialInfo.getInterests().stream()
                .map(interest -> Interest.createInterest(findAccount, interest))
                .collect(Collectors.toList());
        interestRepository.saveAll(interests);

        // 프로필 이미지 저장
        String encodedImageSource = initialInfo.getUserProfileImage().getImageSource();
        byte[] imageSource = base64Decoder.decode(encodedImageSource);
        String extension = initialInfo.getUserProfileImage().getUserProfileExtension();
        String fileName = nameGenerator.generateRandomName().concat(".").concat(extension);
        String imagePath = storageService.store(imageSource, fileName);

        // 계정에 변경 사항 적용
        findAccount.initUser(imagePath, initialInfo.getGender(), initialInfo.getUserBirth());
    }
}
