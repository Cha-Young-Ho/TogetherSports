package com.togethersports.tosproejct.etc;

import com.togethersports.tosproejct.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Table(name = "T_AREA")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ActiveAreas {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "AREA_SEQUENCE_ID")
    private String areaSequenceId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_SEQUENCE_ID")
    private User user;

    @Column(name = "AREA")
    private String area;
}
