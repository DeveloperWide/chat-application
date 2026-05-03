const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const auth = require("../middleware/auth");

router.post("/conversation", auth, messageController.getOrCreateConversation);
router.get("/conversations", auth, messageController.getConversations);
router.get("/messages/:conversationId", auth, messageController.getMessages);
router.post("/send", auth, messageController.sendMessage);
router.put("/read", auth, messageController.markMessagesAsRead);
router.delete("/messages/:messageId", auth, messageController.deleteMessage);

module.exports = router;
