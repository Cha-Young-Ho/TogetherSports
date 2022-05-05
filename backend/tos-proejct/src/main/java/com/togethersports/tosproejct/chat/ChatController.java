package com.togethersports.tosproejct.chat;

import com.togethersports.tosproejct.chat.dto.ChatOfPubRoom;
import com.togethersports.tosproejct.chat.dto.ClientMessage;
import com.togethersports.tosproejct.common.code.CommonCode;
import com.togethersports.tosproejct.common.dto.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
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
@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    private final SimpMessageSendingOperations sendingOperations;
    //방 채팅
    @MessageMapping("/room/{roomId}/chat")
    public void chat(ClientMessage message, @DestinationVariable Long roomId) {
//        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
//            message.setMessage(message.getSender()+"님이 입장하였습니다.");
//        }


        // 해당 방과 해당 유저가 존재하는지 확인
        chatService.checkValidate(message.getUserId(), roomId);

        // 메세지 저장
        ChatOfPubRoom pubMessage = chatService.saveChat(message, roomId);

        // 메세지 전송
        sendingOperations.convertAndSend("/topic/room/"+roomId+"/chat", pubMessage);
    }

    //채팅 내역 조회
    @GetMapping("/api/room/{roomId}/chat")
    public ResponseEntity<Response> getChatInfo(@PathVariable Long roomId, Pageable pageable){

        return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, chatService.getChatHistory(pageable, roomId)));
    }


}
