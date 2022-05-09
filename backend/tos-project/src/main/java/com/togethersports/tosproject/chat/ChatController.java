package com.togethersports.tosproject.chat;

import com.togethersports.tosproject.chat.dto.ChatOfPubRoom;
import com.togethersports.tosproject.chat.dto.ClientMessage;
import com.togethersports.tosproject.common.code.CommonCode;
import com.togethersports.tosproject.common.dto.Response;
import com.togethersports.tosproject.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


/**
 * <h1>ChatController</h1>
 * <p>
 *     채팅과 관련된 요청에 대한 컨트롤러
 * </p>
 * @author younghoCha
 */
@Slf4j
@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    private final SimpMessageSendingOperations sendingOperations;
    //방 채팅
    @MessageMapping("/room/{roomId}/chat")
    public void chat(ClientMessage message, @DestinationVariable Long roomId, @Header Long userId) {
//        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
//            message.setMessage(message.getSender()+"님이 입장하였습니다.");
//        }


        // 해당 방과 해당 유저가 존재하는지 확인
        //chatService.checkValidate(userId, roomId);

        // 메세지 저장
        ChatOfPubRoom pubMessage = chatService.saveChat(message, roomId);

        // 메세지 전송
        sendingOperations.convertAndSend("/topic/room/"+roomId+"/chat", pubMessage);
    }


    public void sendServerMessage(Long roomId, User user, String command, Response response){

        // 방 정보 변화 시, 발행
        if(command.equals("roomInfo")){
            return;
        }

        // 새로운 사용자가 들어왔을 시, 발행
        if(command.equals("enter")){
            return;
        }

        // 사용자 방 나갔을 시, 발행
        if(command.equals("out")){
            return;
        }

        // 방장 위임 시 발행
        if(command.equals("delegate")){
            sendingOperations.convertAndSend("/topic/room/" + roomId +"/chat", response);
            return;
        }

        // 강퇴 시 발행
        if(command.equals("kickOut")){
            sendingOperations.convertAndSend("/topic/room/" + roomId + "/chat", response);
            return;
        }


        sendingOperations.convertAndSend("/topic/room/"+roomId+"/chat", "서버에서 보낸 메세지");
    }

    //채팅 내역 조회
    @GetMapping("/api/room/{roomId}/chat")
    public ResponseEntity<Response> getChatInfo(@PathVariable Long roomId, Pageable pageable){

        return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, chatService.getChatHistory(pageable, roomId)));
    }


}
