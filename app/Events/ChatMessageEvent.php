<?php

namespace App\Events;

use App\Models\Conversation;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatMessageEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private String $message;
    private int $conversationId;
    private int $senderId;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(String $message, int $conversationId, int $senderId)
    {
        $this->message = $message;
        $this->conversationId = $conversationId;
        $this->senderId = $senderId;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('chat.' . $this->conversationId);
    }
    public function broadcastAs()
    {
        return 'chatmessage.' . $this->senderId;
    }
    public function broadcastWith()
    {
        return [
            'message' => $this->message,
            'senderId' => $this->senderId
        ];
    }
}
