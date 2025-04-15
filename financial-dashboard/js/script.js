document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const chatButton = document.querySelector('.chat-button');
    const chatBox = document.querySelector('.chat-box');
    const closeButton = document.querySelector('.btn-close');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-message');
    const chatMessages = document.querySelector('.chat-messages');

    // Toggle chat box
    chatButton.addEventListener('click', function() {
        chatBox.classList.toggle('hidden');
    });

    closeButton.addEventListener('click', function() {
        chatBox.classList.add('hidden');
    });

    // Send message function
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message !== '') {
            // Add user message to chat
            addMessage(message, 'user');
            
            // Clear input
            messageInput.value = '';
            
            // Get bot response
            getBotResponse(message);
        }
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Get bot response
    function getBotResponse(message) {
        // Simulate typing delay
        setTimeout(() => {
            let response;
            
            // Simple response logic
            const lowerMessage = message.toLowerCase();
            
            if (lowerMessage.includes('olá') || lowerMessage.includes('oi') || lowerMessage.includes('hello')) {
                response = "Olá! Como posso ajudar com suas finanças hoje?";
            } 
            else if (lowerMessage.includes('cartão') || lowerMessage.includes('crédito') || lowerMessage.includes('recomendação')) {
                response = "Para recomendar o melhor cartão, preciso conhecer um pouco mais sobre você. Qual é sua renda mensal aproximada e quais benefícios você mais valoriza em um cartão?";
            }
            else if (lowerMessage.includes('renda') && lowerMessage.includes('mensal')) {
                response = "Obrigado pela informação. E você costuma viajar com frequência ou prefere cashback nas suas compras do dia a dia?";
            }
            else if (lowerMessage.includes('viaj')) {
                response = "Entendi! Com base no seu perfil, o Black Card seria ideal para você. Ele oferece pontos que não expiram, salas VIP em aeroportos e seguro viagem completo. Gostaria de saber mais detalhes?";
            }
            else if (lowerMessage.includes('cashback')) {
                response = "Com base no seu perfil, recomendo o Platinum Cashback, que oferece 2% de retorno em todas as compras. Seria uma boa opção para o seu perfil!";
            }
            else if (lowerMessage.includes('saldo') || lowerMessage.includes('extrato')) {
                response = "Seu saldo atual é de R$ 5.420,75. Você gastou R$ 1.845,30 este mês, o que representa 15% a menos que o mês anterior. Parabéns pelo controle!";
            }
            else if (lowerMessage.includes('investimento') || lowerMessage.includes('aplicar')) {
                response = "Com base no seu perfil financeiro, recomendo diversificar seus investimentos: 40% em renda fixa, 30% em fundos multimercado e 30% em ações. Posso detalhar cada opção se desejar.";
            }
            else {
                response = "Obrigado por sua mensagem. Como assistente financeiro, posso ajudar com recomendações de cartões, análise de gastos, sugestões de investimento ou esclarecer dúvidas sobre finanças. Como posso ajudar hoje?";
            }
            
            addMessage(response, 'bot');
        }, 1000);
    }

    // Event listeners for sending messages
    sendButton.addEventListener('click', sendMessage);
    
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Add some simulated data
    function simulateData() {
        // Here you would typically load data from an API
        // For now, we're using the static data in the HTML
    }

    simulateData();
});
