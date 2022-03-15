package com.togethersports.tosproejct.etc;


import com.togethersports.tosproejct.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.*;



@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "T_INTEREST_EXERCISE")
public class Interests {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "INTEREST_EXERCISE_SEQUENCE_ID")
    private int interestExerciseSequenceId;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_SEQUENCE_ID")
    private User user;

    @Column(name = "EXERCISE")
    private String exercise;
}


