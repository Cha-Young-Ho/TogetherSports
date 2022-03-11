//package etc;
//
//import com.togethersports.tosproejct.user.User;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.NoArgsConstructor;
//
//import javax.persistence.*;
//
//@Entity
//@Table(name = "T_AREA")
//@Builder
//@NoArgsConstructor
//@AllArgsConstructor
//public class ActiveAreas {
//
//    @Id
//    @Column(name = "AREA_SEQUENCE_ID")
//    private String areaSequenceId;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "USER_SEQUENCE_ID")
//    private User user;
//
//    @Column(name = "AREA")
//    private String area;
//}
