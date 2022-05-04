package com.togethersports.tosproejct.chat;

import com.togethersports.tosproejct.chat.dto.ChatOfPubRoom;
import com.togethersports.tosproejct.chat.dto.SampleMessage;
import com.togethersports.tosproejct.common.code.CommonCode;
import com.togethersports.tosproejct.common.dto.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;




@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    private final SimpMessageSendingOperations sendingOperations;
    @MessageMapping("/room/{room_id}/chat")
    public void enter(SampleMessage message, @DestinationVariable Long room_id) {
//        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
//            message.setMessage(message.getSender()+"님이 입장하였습니다.");
//        }
        chatService.checkValidate(1L, 1L);

        ChatOfPubRoom pubMessage = chatService.saveChat(message, room_id);


        sendingOperations.convertAndSend("/topic/room/"+room_id+"/chat", pubMessage);
    }

    @GetMapping("/api/room/{roomId}/chat")
    public ResponseEntity<Response> getChatInfo(@PathVariable Long roomId, Pageable pageable){

        return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, chatService.getChatHistory(pageable, roomId)));
    }


}
