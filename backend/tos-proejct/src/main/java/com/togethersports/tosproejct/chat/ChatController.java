package com.togethersports.tosproejct.chat;

import com.togethersports.tosproejct.chat.dto.SampleMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    private final SimpMessageSendingOperations sendingOperations;
    @MessageMapping("/room/{room_id}/chat")
    public void enter(SampleMessage message, @DestinationVariable Long room_id, @Header String Authorization) {
//        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
//            message.setMessage(message.getSender()+"님이 입장하였습니다.");
//        }

        chatService.checkValidate(message.getUserId(), message.getRoomId());

        sendingOperations.convertAndSend("/topic/room/"+room_id+"/chat", message);

        chatService.saveChat(message, room_id);
    }

    


}
