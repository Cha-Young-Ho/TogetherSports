package com.togethersports.tosproject.common.code;

/**
 * <h1>AbstractResponseCode</h1>
 * <p>
 *     요청에 대한 응답 본문에 들어갈 처리 상황 코드 enum 이 구현해야할 인터페이스
 * </p>
 * <p>
 *     특정 도메인에 대해 응답 메시지 enum 을 작성할 때 해당 클래스를 구현 해야함
 * </p>
 *
 * @author seunjeon
 */
public interface ResponseCode {
    /**
     * 요청 처리 결과에 대한 코드값으로 HTTP Status 코드와는 별개로 보다 상세한 정보를 나타내야 한다.
     * @return code 요청 처리 결과 코드
     */
    int getCode();

    /**
     * code 가 어떤 것을 의미하는지 나타내야 한다.
     * @return message 요청 처리 결과 메시지
     */
    String getMessage();
}
