package com.togethersports.tosproejct.etc;

import com.togethersports.tosproejct.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;



@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class ActiveAreas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userSequenceId")
    private User user;

    @Column
    private String area;
}
