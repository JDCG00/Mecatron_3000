/** 
    mecatron3000.js
    Controladro principal del juego Mecatron3000
    @author Juan Diego Carretero Granado <jcarreterogranado.guadalupe@alumnado.fundacionloyola.net>
    @License GPL v3 2021
*/

'use strict'

/*Controlador principal del juego*/

class Juego{
    constructor(){
        this.vista = new Vista()
        this.modelo = new Modelo()
        this.generadorPalabras = null
        this.animador = null
        this.divPrincipal = null
        window.onload = this.iniciar.bind(this)
    }
    iniciar(){  
        console.log('Iniciando...');
        this.divPrincipal = document.getElementById('divPrincipal')
        this.vista.div = this.divPrincipal
        this.generadorPalabras = window.setInterval(this.generarPalabra.bind(this), 3000)   
        this.animador = window.setInterval(this.vista.moverPalabras.bind(this.vista), 100)    
        window.onkeypress = this.pulsar.bind(this)
    }
    generarPalabra(){
        let nuevaPalabra = this.modelo.crearPalabra()
        this.vista.dibujar(nuevaPalabra)
    }

    pulsar(evento){
        let letraPulsada = evento.key
        console.log(`Has pulsado ${letraPulsada}`);
        //Busco todas las palabras
        let palabras = this.divPrincipal.querySelectorAll('.palabra')
        
        
        for(let palabra of palabras){
            let span = palabra.children.item(0)
            let nodoTexto = palabra.childNodes[1]
            let textoRestante = nodoTexto.nodeValue
            let primeraLetraTextoRestante = textoRestante.charAt(0)
            if (letraPulsada == primeraLetraTextoRestante) {
                span.textContent += letraPulsada
                nodoTexto.nodeValue = textoRestante.substring(1) 
                
                //Si ha completado la parabra, la elimina y suma puntos
                if (nodoTexto.nodeValue.length == 0) {
                    palabra.remove()
                    /*this.modelo.sumarPunto()*/
                }
                else{
                    
                }

            }
            else{
                //Ha fallado, repongo el texto de la palabra
                
            }
        }
    }
}
class Vista{
    constructor(){
        this.div = null
    }
    /** 
        Dibuja el área de juego
        @param divPrincipal (HTMLDivElement) Div en el que dibujar el juego
    */
    dibujar(palabra){
        //<div class="palabra">MECA</div>
        let div = document.createElement('div')
        this.div.appendChild(div)
        let span = document.createElement('span')
        div.appendChild(span)
        div.appendChild(document.createTextNode(palabra))
        div.classList.add('palabra')
        div.style.top = '0px'
        div.style.left = Math.floor(Math.random() * 85) + '%'
    }    
    moverPalabras(){
        //Busco todas las palabras del div
        let palabras = this.div.querySelectorAll('.palabra')
        //console.log(palabras);
        //Para cada palabra, aumenta su atributo top.
        for(let palabra of palabras){
            let top = parseInt(palabra.style.top)
            top += 3.5
            palabra.style.top = `${top}px`
        }
    }
}
class Modelo{    
    constructor(){
        this.palabras = ['En', 'un', 'lugar', 'de', 'la', 'Mancha']
    }
    /**
        @return (String) Palabra generada     
    **/
   crearPalabra(){
       return this.palabras[Math.floor(Math.random() * this.palabras.length)]
   }
}



var app = new Juego()