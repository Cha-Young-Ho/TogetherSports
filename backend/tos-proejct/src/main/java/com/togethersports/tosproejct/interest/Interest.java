package com.togethersports.tosproejct.interest;

import com.togethersports.tosproejct.account.Account;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

/**
 * <h1>Interest</h1>
 * <p>
 *     관심 종목 엔티티
 * </p>
 * <p>
 *     계정 별로 1~5개 지정될 수 있다.
 * </p>
 * <p>신규 관심 종목 생성 시 다음 메소드를 참조한다. {@link #createInterest(Account, String)}</p>
 * @author seunjeon
 */
@Getter
@Entity
public class Interest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "INTEREST_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @Column(name = "INTEREST_NAME")
    private String name;

    // 관심 종목 엔티티를 빌더나 생성자를 통해 무분별하게 생성하는 것을 방지
    @Builder(access = AccessLevel.PRIVATE)
    private Interest(Account account, String name) {
        this.account = account;
        this.name = name;
    }
    protected Interest() {}

    /**
     * 신규 관심 종목 엔티티를 생성해서 반환한다.
     * @param account 해당 관심종목이 적용될 계정 엔티티, 반드시 id 값이 설정되 있어야 함
     * @param name 관심 종목 명
     * @return interest 생성된 관심 종목 엔티티
     */
    public static Interest createInterest(Account account, String name) {
        return Interest.builder()
                .account(account)
                .name(name)
                .build();
    }

}
