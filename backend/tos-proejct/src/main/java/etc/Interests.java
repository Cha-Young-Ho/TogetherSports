package etc;


import com.togethersports.tosproejct.user.User;

import javax.persistence.*;

@Entity
@Table(name = "T_INTEREST_EXERCISE")
public class Interests {

    @Id
    @Column(name = "INTEREST_EXERCISE_SEQUENCE_ID")
    private int interestExerciseSequenceId;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_SEQUENCE_ID")
    private User user;

    @Column(name = "EXERCISE")
    private String exercise;
}
