(function() {
    var loopAtivo = false; // Variável que define se o sistema está ativo ou não.
    let caso = 0; // Variável identificadora do caso.
    
    // caso 1 - O caso ideal. O motorista simplesmente segue seu caminho e nada de ruim acontece.
    document.getElementById('button1').onclick = function() {
        if (loopAtivo == false){
            startingVelocity = 80;
            botaoPanico.innerHTML = "<strong>DESATIVADO</strong>";
            statusOperacao.innerHTML = "<strong>NORMAL</strong>"
            statusOperacao.style.color = "green";
            botaoPanico.style.color = "green";
            caso = 1;
            loop();
            graphic(1);
        }else{location.reload()}
    }

    // caso 2 - O furto. O motorista durante seu caminho é assaltado e perde a carga.
    document.getElementById('button2').onclick = function() {
        if (loopAtivo == false){
            startingVelocity = 60;
            botaoPanico.innerHTML = "<strong>ATIVADO</strong>"
            statusOperacao.innerHTML = "<strong>IRREGULAR</strong>"
            statusOperacao.style.color = "#FF5900";
            botaoPanico.style.color = "#FF5900";
            caso = 2;
            loop();
            graphic(1);
        }else{location.reload()}
    }

    // caso 3 - O apodrecimento da carga. A temperatura sobe demais e a carga apodrece.
    document.getElementById('button3').onclick = function() {
        if (loopAtivo == false){
            startingVelocity = 60;
            botaoPanico.innerHTML = "<strong>DESATIVADO</strong>";
            caso = 3;
            loop();
            graphic(1.15);
        }else{location.reload()}
    }

    // Getters para manipulação ao vivo do HTML.
    var botaoPanico = document.getElementById('panic-button')
    var statusOperacao = document.getElementById('operation-status')
    var gasolineMeter = document.getElementById('gasoline-meter');
    var gasLevel = document.getElementById('gas-level');
    var velocity = document.getElementById('velocity');
    var humidity = document.getElementById('humidity-meter');
    var temperature = document.getElementById('temperature-meter');
    var atingiuZero = false;
    var tempoEspera = 0;

    // Valores iniciais para os parâmetros.
    var startingHumidity = 12;
    let startingVelocity
    var startingTemperature = 22.0;

    // Loop que ativa a função task por um número x de vezes.
    function loop(){
        loopAtivo = true;
        let i = 0;
        while (i < 5000) {
            task(i);
            i++;
        }
    }
    
    // Função "default" da velocidade, um simulador de um caso normal de velocidade em uma via.
    function normalSpeed(){
        // O medidor de velocidade tem 3 possíveis resultados, 1/3 das vezes ele sobe 1km/h, 
        // 1/3 das vezes ele desce 1km/h e 1/3 das vezes ele se mantém.
        // No geral, ele varia entre +15km/h e -15km/h
        var randomNumber = Math.floor(Math.random() * 100) + 1; // Gerador de número aleatório utilizado.
        if (randomNumber < 33){
            accelerate(1)
        }else if(randomNumber > 33 && randomNumber < 66){
            decelerate(1)
        }else{}
        return randomNumber
    }

    // Função "default" da umidade e temperatura, mantém ambos em uma média estável.
    function normalHumidityTemperature(){
        // O medidor de umidade e temperatura atuam no mesmo if (a fim de economizar linhas), 
        // eles têm 10% de chance de subir e 10% de chance de descer, mas 80% das vezes ficam a mesma quantidade.
        // No geral, a temperatura fica entre 21°C-23°C e a umidade entre 12%-30%.
        var randomNumber = Math.floor(Math.random() * 100) + 1; // Gerador de número aleatório utilizado.
        if (randomNumber < 11){
            startingHumidity++;
            startingTemperature = startingTemperature - 0.1;
        }else if (randomNumber > 90){
            startingHumidity--;
            startingTemperature = startingTemperature + 0.1;
        }
    }

    // Função para acelerar o caminhão um número "times" de vezes.
    function accelerate(times){
        let u = 0;
        while (u < times) {
            startingVelocity++;
            u++;
        }
    }

    // Função para desacelerar o caminhão um número "times" de vezes.
    function decelerate(times){
        let j = 0;
        while (j < times) {
            startingVelocity--;
            j++;
        } 
    }

    // Função responsável por controlar os números que aparecerão na tela, em suma ela roda a cada x milissegundos para atualizar os dados de acordo com cada caso.
    function task(i) {
        setTimeout(function() {

            // Função que define os dados para o caso 1
            function caso1(){
                normalSpeed()
                normalHumidityTemperature()
                gasolineMeter.value = 500 - i/10; // 500L sendo o valor inicial, o medidor de gasolina desce 0.1L por segundo.
            }

            // Função que define os dados para o caso 2.
            function caso2(){

                // Durante essa função, uma história é contada, o motorista é abordado, pressiona o botão de pânico, que nos avisa em nosso sistema e uma linha de acontecimentos ocorre:
                // O caminhão desacelera até atingir 0-1km/h e permanece por um momento nessa velocidade.
                // O caminhão é furtado e o ladrão acelera até manter uma velocidade próxima dos 80km/h.

                var randomNumber = Math.floor(Math.random() * 100) + 1; // Gerador de número aleatório utilizado.

                // Parte em que o motorista é abordado e é obrigado a desacelerar até parar o caminhão.
                if (startingVelocity > 0 && atingiuZero == false){
                    if(randomNumber > 10){
                        decelerate(3);
                    }
                }

                // Parte em que o caminhão para por alguns segundos (para dar tempo de o ladrão invadir e levar o veículo)
                if (startingVelocity == 0 && tempoEspera < 3){
                    atingiuZero = true;
                    tempoEspera++;
                }

                // Parte em que o caminhão acelera após o furto
                if (atingiuZero == true && startingVelocity < 80 && tempoEspera > 2){
                    accelerate(3);
                }

                // O caminhão atinge os 80km/h
                if (startingVelocity > 80){
                    atingiu80 = true;
                }

                // Regras para regulação do parâmetro
                if (startingVelocity < 1){
                    startingVelocity = 0;
                }

                // Após atingir os 80km/h, o caminnhão volta ao padrão normal de velocidade.
                if (atingiu80 = true){
                    normalSpeed();
                }


                gasolineMeter.value = 500 - i/10; // 500L sendo o valor inicial, o medidor de gasolina desce 0.1L por segundo.
                normalHumidityTemperature()
            }

            // Função que define os dados para o caso 3.
            function caso3(){
                normalSpeed()
                var randomNumber = Math.floor(Math.random() * 100) + 1; // Gerador de número aleatório utilizado.

                // Neste if, são definidas as chances de subir ou diminuir a temperatura. 
                // 70% dos casos, sobe 0.6°C, 20% dos casos abaixa 0.2°C e 10% dos casos, se mantém.
                if (randomNumber < 70 && startingTemperature < 35){
                    startingTemperature = startingTemperature + 0.6;
                }else if (randomNumber > 80){
                    startingTemperature = startingTemperature - 0.2;
                }

                // Neste if, são definidas as chances de subir ou diminuir a umidade.
                // 50% de chance de subir 0.3%, 50% de chance de descer 0.3°C.  
                if (randomNumber > 50){
                    startingHumidity = startingHumidity - 0.3;
                }else{
                    startingHumidity = startingHumidity + 0.3;
                }

                // Neste if, são definidas as regras de cores e texto do display.
                // A partir de 30°C, o texto da temperatura fica amarelo e o status muda para "ALTA TEMPERATURA".
                // A partir de 35°C, o texto da temperatura fica laranja.
                if (startingTemperature > 30 && startingTemperature < 35){
                    statusOperacao.innerHTML = "<strong>ALTA TEMPERATURA</strong>"
                    statusOperacao.style.color = "#FF5900";
                    temperature.style.color = "yellow";
                } else if(startingTemperature >= 35){
                    temperature.style.color = "#FF5900";
                } else{
                    statusOperacao.innerHTML = "<strong>NORMAL</strong>"
                    temperature.style.color = "black";
                }
                gasolineMeter.value = 500 - i/10; // 500L sendo o valor inicial, o medidor de gasolina desce 0.1L por segundo.
            }

            // Switch case que define qual função irá rodar.
            switch (caso) {
                case 1:
                    caso1();
                    break;
                case 2:
                    caso2();
                    break;
                case 3:
                    caso3();
                    break;
            }

            // Setters dos medidores 
            gasLevel.innerHTML = gasolineMeter.value.toPrecision(4) + "L/500L"; 
            if (startingHumidity > 0 && startingHumidity < 25){
                humidity.innerHTML = startingHumidity.toPrecision(2) + '%'
            }
            if (startingVelocity > -1){
                velocity.innerHTML = startingVelocity + ' Km/h'
            }
            temperature.innerHTML = startingTemperature.toPrecision(3) + '°C'
      }, 500 * i);
    }      
    
})();

// Parte dedicada ao CanvasJs, o parâmetro passado na função serve para alterar a curvatura do gráfico, que sobe no caso 3.
function graphic(yValNum) {

    var dps = []; 
    var chart = new CanvasJS.Chart("chartContainer", {
        backgroundColor: "#D9D9D9",
        title :{
            text: "Nível de Etileno"
        },
        data: [{
            type: "line",
            lineColor: "black",
            dataPoints: dps
        }]
    });
    
    var xVal = 0;
    var yVal = 30; 
    var updateInterval = 1000;
    var dataLength = 80; 
    
    var updateChart = function (count) {
    
        count = count || 1;
        for (var j = 0; j < count; j++) {
                yVal = yVal +  Math.round(yValNum + Math.random() *(-1-1))
            
            dps.push({
                x: xVal,
                y: yVal
            });
            xVal++;
        }
    
        if (dps.length > dataLength) {
            dps.shift();
        }
    
        chart.render();
    };
    
    updateChart(dataLength);
    setInterval(function(){updateChart()}, updateInterval);
    
    } 