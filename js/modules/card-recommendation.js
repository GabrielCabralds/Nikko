/**
 * Módulo de Recomendação de Cartões de Crédito
 * Implementa avaliação de perfil do usuário para encontrar o cartão ideal
 */

const CardRecommendation = (function() {
    // Definições de cartões disponíveis
    const availableCards = [
        {
            id: 'basic-no-fee',
            name: 'Cartão Essencial',
            type: 'Básico sem anuidade',
            annualFee: 0,
            benefits: [
                'Sem anuidade',
                'App de controle de gastos',
                'Pagamento por aproximação',
                'Programa de descontos básico'
            ],
            ideal_for: 'Controle de gastos e praticidade no dia a dia sem custos adicionais',
            min_income: 1000,
            cashback: '0.5% em todas as compras',
            travel_benefits: 'Nenhum',
            insurance: 'Proteção básica de compras',
            image: 'basic-card.svg'
        },
        {
            id: 'cashback-plus',
            name: 'Cartão Cashback Plus',
            type: 'Cashback',
            annualFee: 200,
            benefits: [
                '2% de cashback em supermercados e farmácias',
                '1% de cashback nas demais compras',
                'Cashback creditado automaticamente na fatura',
                'Seguro de proteção de preço'
            ],
            ideal_for: 'Consumidores que preferem retorno direto em dinheiro em vez de pontos',
            min_income: 2500,
            cashback: 'Até 2% em categorias selecionadas',
            travel_benefits: 'Desconto em aluguel de carros',
            insurance: 'Proteção de compras e garantia estendida',
            image: 'cashback-card.svg'
        },
        {
            id: 'travel-miles',
            name: 'Cartão Viajante',
            type: 'Milhas e Viagens',
            annualFee: 350,
            benefits: [
                '2.5 pontos por dólar gasto',
                'Milhas não expiram',
                'Salas VIP em aeroportos (4 acessos/ano)',
                'Descontos em parceiros de viagem'
            ],
            ideal_for: 'Viajantes frequentes que desejam acumular milhas e benefícios em viagens',
            min_income: 4000,
            cashback: 'Programa de pontos conversíveis (equivalente a 1-3% de retorno)',
            travel_benefits: 'Salas VIP, seguro viagem e assistência global',
            insurance: 'Seguro médico internacional e proteção de bagagem',
            image: 'travel-card.svg'
        },
        {
            id: 'premium-black',
            name: 'Cartão Black Premium',
            type: 'Premium com Benefícios Exclusivos',
            annualFee: 800,
            benefits: [
                'Programa de pontos premium (3x pontos por dólar)',
                'Acesso ilimitado a salas VIP',
                'Concierge 24h',
                'Experiências exclusivas e eventos VIP',
                'Upgrade em hotéis parceiros'
            ],
            ideal_for: 'Consumidores de alto padrão que buscam status e benefícios exclusivos',
            min_income: 12000,
            cashback: 'Programa de pontos premium (equivalente a 2-5% de retorno)',
            travel_benefits: 'Pacote completo: salas VIP ilimitadas, seguro premium, concierge',
            insurance: 'Pacote completo de seguros internacionais',
            image: 'premium-card.svg'
        },
        {
            id: 'credit-builder',
            name: 'Cartão Construtor',
            type: 'Construção de Crédito',
            annualFee: 60,
            benefits: [
                'Aprovação facilitada',
                'Relatórios mensais de score de crédito',
                'Aumento de limite programado',
                'Educação financeira integrada'
            ],
            ideal_for: 'Pessoas iniciando vida financeira ou reconstruindo histórico de crédito',
            min_income: 800,
            cashback: '0.25% em todas as compras',
            travel_benefits: 'Nenhum',
            insurance: 'Básica',
            image: 'builder-card.svg'
        }
    ];

    // Função para criar o formulário de avaliação
    function createAssessmentForm() {
        return `
            <div class="assessment-container">
                <h2>Encontre seu cartão ideal</h2>
                <p class="assessment-intro">Responda algumas perguntas rápidas para descobrirmos qual cartão melhor se adapta ao seu perfil e necessidades.</p>
                
                <form id="card-assessment-form">
                    <div class="form-group">
                        <label for="monthly-income">Qual é sua renda mensal? (R$)</label>
                        <input type="number" id="monthly-income" name="monthly-income" min="500" placeholder="Ex: 3500" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Qual é seu principal objetivo com um cartão de crédito?</label>
                        <div class="radio-group">
                            <label>
                                <input type="radio" name="card-goal" value="travel" required>
                                Acumular pontos/milhas para viagens
                            </label>
                            <label>
                                <input type="radio" name="card-goal" value="cashback">
                                Obter cashback nas compras
                            </label>
                            <label>
                                <input type="radio" name="card-goal" value="benefits">
                                Benefícios e seguros diversos
                            </label>
                            <label>
                                <input type="radio" name="card-goal" value="control">
                                Controle de gastos e organização financeira
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Com que frequência você viaja ao exterior?</label>
                        <div class="radio-group">
                            <label>
                                <input type="radio" name="travel-frequency" value="never" required>
                                Nunca ou raramente
                            </label>
                            <label>
                                <input type="radio" name="travel-frequency" value="sometimes">
                                1-2 vezes por ano
                            </label>
                            <label>
                                <input type="radio" name="travel-frequency" value="frequent">
                                3 ou mais vezes por ano
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Quais categorias representam seus maiores gastos mensais? (Selecione até 2)</label>
                        <div class="checkbox-group">
                            <label>
                                <input type="checkbox" name="spending-category" value="grocery" class="spending-cb">
                                Supermercado/Alimentação
                            </label>
                            <label>
                                <input type="checkbox" name="spending-category" value="restaurant" class="spending-cb">
                                Restaurantes
                            </label>
                            <label>
                                <input type="checkbox" name="spending-category" value="transport" class="spending-cb">
                                Transporte (combustível, aplicativos)
                            </label>
                            <label>
                                <input type="checkbox" name="spending-category" value="online" class="spending-cb">
                                Compras online
                            </label>
                            <label>
                                <input type="checkbox" name="spending-category" value="entertainment" class="spending-cb">
                                Entretenimento
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Você costuma pagar o valor total da fatura mensalmente?</label>
                        <div class="radio-group">
                            <label>
                                <input type="radio" name="full-payment" value="yes" required>
                                Sim
                            </label>
                            <label>
                                <input type="radio" name="full-payment" value="no">
                                Não
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Qual valor de anuidade você considera aceitável?</label>
                        <div class="radio-group">
                            <label>
                                <input type="radio" name="annual-fee" value="0" required>
                                Somente cartões sem anuidade
                            </label>
                            <label>
                                <input type="radio" name="annual-fee" value="150">
                                Até R$150/ano
                            </label>
                            <label>
                                <input type="radio" name="annual-fee" value="400">
                                Até R$400/ano
                            </label>
                            <label>
                                <input type="radio" name="annual-fee" value="9999">
                                Acima de R$400 se os benefícios compensarem
                            </label>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn-primary">Encontrar meu cartão ideal</button>
                </form>
            </div>
        `;
    }

    // Função para criar o card de resultado
    function createCardResult(card) {
        return `
            <div class="card-result">
                <h3>${card.name}</h3>
                <div class="card-result-type">${card.type}</div>
                <div class="card-result-fee">Anuidade: R$ ${card.annualFee.toFixed(2)}</div>
                <div class="card-result-info">
                    <p><strong>Ideal para:</strong> ${card.ideal_for}</p>
                    <p><strong>Cashback:</strong> ${card.cashback}</p>
                    <p><strong>Benefícios para viagens:</strong> ${card.travel_benefits}</p>
                    <p><strong>Seguros:</strong> ${card.insurance}</p>
                </div>
                <div class="card-benefits">
                    <h4>Principais Benefícios</h4>
                    <ul>
                        ${card.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                </div>
                <button class="btn-apply">Solicitar este cartão</button>
            </div>
        `;
    }

    // Função para calcular a pontuação do cartão com base no perfil
    function scoreCardForProfile(card, profileData) {
        let score = 0;
        
        // Verificar renda mínima
        if (profileData.income >= card.min_income) {
            score += 10;
        } else {
            return -1; // Desqualificar se a renda for menor que a mínima
        }
        
        // Verificar anuidade aceitável
        if (card.annualFee <= parseFloat(profileData.annualFee)) {
            score += 10;
        } else {
            return -1; // Desqualificar se a anuidade for maior que a aceitável
        }
        
        // Pontuação com base no objetivo do cartão
        switch (profileData.cardGoal) {
            case 'travel':
                if (card.id === 'travel-miles' || card.id === 'premium-black') {
                    score += 15;
                } else if (card.id === 'cashback-plus') {
                    score += 5;
                }
                break;
            case 'cashback':
                if (card.id === 'cashback-plus') {
                    score += 15;
                } else if (card.id === 'basic-no-fee') {
                    score += 10;
                }
                break;
            case 'benefits':
                if (card.id === 'premium-black') {
                    score += 15;
                } else if (card.id === 'travel-miles') {
                    score += 10;
                }
                break;
            case 'control':
                if (card.id === 'basic-no-fee' || card.id === 'credit-builder') {
                    score += 15;
                }
                break;
        }
        
        // Pontuação com base na frequência de viagens
        switch (profileData.travelFrequency) {
            case 'frequent':
                if (card.id === 'premium-black') {
                    score += 15;
                } else if (card.id === 'travel-miles') {
                    score += 10;
                }
                break;
            case 'sometimes':
                if (card.id === 'travel-miles') {
                    score += 10;
                } else if (card.id === 'premium-black') {
                    score += 5;
                }
                break;
            case 'never':
                if (card.id === 'basic-no-fee' || card.id === 'cashback-plus') {
                    score += 10;
                }
                break;
        }
        
        // Pontuação com base no pagamento integral da fatura
        if (profileData.fullPayment === 'yes') {
            if (card.id === 'premium-black' || card.id === 'travel-miles' || card.id === 'cashback-plus') {
                score += 10;
            }
        } else {
            if (card.id === 'basic-no-fee' || card.id === 'credit-builder') {
                score += 10;
            }
        }
        
        return score;
    }

    // Processar o formulário e encontrar o cartão ideal
    function processAssessment(formData) {
        const profileData = {
            income: parseFloat(formData.get('monthly-income')),
            cardGoal: formData.get('card-goal'),
            travelFrequency: formData.get('travel-frequency'),
            spendingCategories: formData.getAll('spending-category'),
            fullPayment: formData.get('full-payment'),
            annualFee: formData.get('annual-fee')
        };
        
        // Calcular a pontuação para cada cartão
        const scoredCards = [];
        
        availableCards.forEach(card => {
            const score = scoreCardForProfile(card, profileData);
            if (score >= 0) { // Incluir apenas cartões com pontuação válida
                scoredCards.push({
                    card: card,
                    score: score
                });
            }
        });
        
        // Ordenar por pontuação (maior para menor)
        scoredCards.sort((a, b) => b.score - a.score);
        
        return scoredCards.slice(0, 2); // Retornar os dois melhores cartões
    }
    
    // Inicializar o módulo
    function init() {
        // Adicionar estilos CSS
        const style = document.createElement('style');
        style.textContent = `
            .assessment-container {
                background: white;
                border-radius: 10px;
                padding: 25px;
                margin: 20px 0;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            
            .assessment-container h2 {
                margin-bottom: 15px;
                color: #000;
                font-size: 22px;
            }
            
            .assessment-intro {
                margin-bottom: 20px;
                color: #555;
            }
            
            .form-group {
                margin-bottom: 20px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
            }
            
            .form-group input[type="number"] {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
            
            .radio-group, .checkbox-group {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .radio-group label, .checkbox-group label {
                display: flex;
                align-items: center;
                font-weight: normal;
                cursor: pointer;
            }
            
            .radio-group input, .checkbox-group input {
                margin-right: 10px;
            }
            
            .btn-primary {
                background: #000;
                color: white;
                border: none;
                padding: 12px 20px;
                border-radius: 5px;
                font-size: 16px;
                cursor: pointer;
                transition: background 0.3s;
            }
            
            .btn-primary:hover {
                background: #333;
            }
            
            .card-result {
                background: white;
                border-radius: 10px;
                padding: 20px;
                margin: 20px 0;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            
            .card-result h3 {
                margin-bottom: 5px;
                font-size: 20px;
            }
            
            .card-result-type {
                color: #555;
                margin-bottom: 10px;
                font-size: 14px;
            }
            
            .card-result-fee {
                background: #f5f5f5;
                display: inline-block;
                padding: 5px 10px;
                border-radius: 3px;
                font-weight: 500;
                margin-bottom: 15px;
            }
            
            .card-result-info {
                margin-bottom: 15px;
            }
            
            .card-result-info p {
                margin-bottom: 5px;
            }
            
            .card-benefits ul {
                padding-left: 20px;
                margin: 10px 0;
            }
            
            .card-benefits li {
                margin-bottom: 5px;
            }
            
            .btn-apply {
                background: #000;
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 15px;
            }
            
            .btn-apply:hover {
                background: #333;
            }
            
            .results-container {
                margin-top: 30px;
            }
            
            .results-header {
                margin-bottom: 20px;
                text-align: center;
            }
            
            .results-cards {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 20px;
            }
        `;
        document.head.appendChild(style);
        
        // Adicionar botão ao cartão existente
        const creditCard = document.querySelector('.credit-card');
        if (creditCard) {
            const cardButton = document.createElement('button');
            cardButton.className = 'btn-find-card';
            cardButton.textContent = 'Encontrar meu cartão ideal';
            cardButton.style.cssText = `
                background: white;
                color: black;
                border: none;
                padding: 8px 15px;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 15px;
                font-weight: 500;
                display: block;
                width: 100%;
            `;
            
            creditCard.appendChild(cardButton);
            
            // Adicionar evento ao botão
            cardButton.addEventListener('click', showAssessmentForm);
        }
    }
    
    // Função para mostrar o formulário de avaliação
    function showAssessmentForm() {
        // Criar o container de avaliação
        const assessmentSection = document.createElement('section');
        assessmentSection.className = 'assessment-section';
        assessmentSection.innerHTML = createAssessmentForm();
        
        // Adicionar a seção após a seção do cartão
        const cardSection = document.querySelector('.card-section');
        if (cardSection && cardSection.nextElementSibling) {
            cardSection.parentNode.insertBefore(assessmentSection, cardSection.nextElementSibling);
        } else {
            document.querySelector('main').appendChild(assessmentSection);
        }
        
        // Adicionar evento de submit ao formulário
        const form = document.getElementById('card-assessment-form');
        form.addEventListener('submit', handleFormSubmit);
        
        // Limitar seleção de checkboxes (máximo 2)
        const checkboxes = document.querySelectorAll('.spending-cb');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const checked = document.querySelectorAll('.spending-cb:checked');
                if (checked.length > 2) {
                    this.checked = false;
                }
            });
        });
        
        // Scroll para o formulário
        assessmentSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Função para lidar com o submit do formulário
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Coletar dados do formulário
        const formData = new FormData(e.target);
        
        // Processar dados e obter recomendações
        const recommendations = processAssessment(formData);
        
        // Mostrar resultados
        showResults(recommendations);
    }
    
    // Função para mostrar os resultados
    function showResults(recommendations) {
        // Remover resultados anteriores se existirem
        const existingResults = document.querySelector('.results-container');
        if (existingResults) {
            existingResults.remove();
        }
        
        // Criar container de resultados
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'results-container';
        
        // Adicionar cabeçalho
        resultsContainer.innerHTML = `
            <div class="results-header">
                <h2>Cartões recomendados para o seu perfil</h2>
                <p>Com base nas suas respostas, selecionamos os cartões que melhor se adequam ao seu perfil financeiro.</p>
            </div>
            <div class="results-cards">
                ${recommendations.length > 0 
                    ? recommendations.map(rec => createCardResult(rec.card)).join('') 
                    : '<p>Nenhum cartão encontrado que corresponda ao seu perfil. Por favor, revise suas respostas.</p>'}
            </div>
        `;
        
        // Adicionar ao DOM após o formulário
        const assessmentSection = document.querySelector('.assessment-section');
        if (assessmentSection) {
            assessmentSection.after(resultsContainer);
        } else {
            document.querySelector('main').appendChild(resultsContainer);
        }
        
        // Adicionar eventos aos botões de aplicação
        document.querySelectorAll('.btn-apply').forEach(button => {
            button.addEventListener('click', function() {
                alert('Funcionalidade de solicitação em desenvolvimento. Em breve você poderá solicitar seu cartão aqui!');
            });
        });
        
        // Scroll para os resultados
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    // API pública do módulo
    return {
        init: init,
        showAssessmentForm: showAssessmentForm
    };
})();

// Inicializar o módulo quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o módulo deve ser inicializado automaticamente
    CardRecommendation.init();
});
