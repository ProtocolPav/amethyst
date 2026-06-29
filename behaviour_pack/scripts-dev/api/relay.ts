import {serverRelayV1RelayPost} from "./nexuscore/webhook-relay/webhook-relay";


export default class Relay {
    public static message(nametag: string, content: string) {
        serverRelayV1RelayPost({
            "type": "message",
            "content": content,
            "embed_title": "",
            "embed_content": "",
            "name": nametag
        }).then()
    }

    public static event(title: string, content: string, event_type: 'join' | 'leave' | 'start' | 'other') {
        serverRelayV1RelayPost({
            'type': event_type,
            'content': '',
            'embed_title': title,
            'embed_content': content,
            'name': 'Server'
        }).then()
    }
}