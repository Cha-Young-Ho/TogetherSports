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
@Table
public class Interests {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int interestExerciseSequenceId;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userSequenceId")
    private User user;

    @Column
    private String exercise;
}


