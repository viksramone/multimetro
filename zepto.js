//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
//Control del selector del multímetro

	var casoDeUso = 2;
	//caso de uso 0 --> explicar posiciones del multímetro
	//caso de uso 1 --> conectar puntas
	//caso de uso 2 --> mediar diferencia de potencial de una base de enchufe: 230 VAC
	//caso de uso 3 --> mediar diferencia de potencial a la entrada y a la salida de un transformador: 230 VAC/5 VDC
	//caso de uso 4 --> ...
	var indicePosicionSelector = 0;
	var posicionSelector = new Array (20);
		posicionSelector[0] = "./images/boto1.jpg";
		posicionSelector[1] = "./images/boto2.jpg";
		posicionSelector[2] = "./images/boto3.jpg";
		posicionSelector[3] = "./images/boto4.jpg";
		posicionSelector[4] = "./images/boto5.jpg";
		posicionSelector[5] = "./images/boto6.jpg";
		posicionSelector[6] = "./images/boto7.jpg";
		posicionSelector[7] = "./images/boto8.jpg";
		posicionSelector[8] = "./images/boto9.jpg";
		posicionSelector[9] = "./images/boto10.jpg";
		posicionSelector[10] = "./images/boto11.jpg";
		posicionSelector[11] = "./images/boto12.jpg";
		posicionSelector[12] = "./images/boto13.jpg";
		posicionSelector[13] = "./images/boto14.jpg";
		posicionSelector[14] = "./images/boto15.jpg";
		posicionSelector[15] = "./images/boto16.jpg";
		posicionSelector[16] = "./images/boto17.jpg";
		posicionSelector[17] = "./images/boto18.jpg";
		posicionSelector[18] = "./images/boto19.jpg";
		posicionSelector[19] = "./images/boto20.jpg";
		posicionSelector[20] = "./images/boto21.jpg";
		posicionSelector[21] = "./images/boto22.jpg";
		posicionSelector[22] = "./images/boto23.jpg";
		posicionSelector[23] = "./images/boto24.jpg";

	var estadoFusiblePosicionSelector = new Array (20);
		estadoFusiblePosicionSelector[0] = "Correcto";
		estadoFusiblePosicionSelector[1] = "Correcto";
		estadoFusiblePosicionSelector[2] = "Correcto";
		estadoFusiblePosicionSelector[3] = "Correcto";
		estadoFusiblePosicionSelector[4] = "Correcto";
		estadoFusiblePosicionSelector[5] = "Correcto";
		estadoFusiblePosicionSelector[6] = "Correcto";
		estadoFusiblePosicionSelector[7] = "Correcto";
		estadoFusiblePosicionSelector[8] = "Correcto";
		estadoFusiblePosicionSelector[9] = "Correcto";
		estadoFusiblePosicionSelector[10] = "Correcto";
		estadoFusiblePosicionSelector[11] = "Correcto";
		estadoFusiblePosicionSelector[12] = "Correcto";
		estadoFusiblePosicionSelector[13] = "Correcto";
		estadoFusiblePosicionSelector[14] = "Correcto";
		estadoFusiblePosicionSelector[15] = "Correcto";
		estadoFusiblePosicionSelector[16] = "Correcto";
		estadoFusiblePosicionSelector[17] = "Correcto";
		estadoFusiblePosicionSelector[18] = "Correcto";
		estadoFusiblePosicionSelector[19] = "Correcto";
		estadoFusiblePosicionSelector[20] = "Correcto";
		estadoFusiblePosicionSelector[21] = "Correcto";
		estadoFusiblePosicionSelector[22] = "Correcto";
		estadoFusiblePosicionSelector[23] = "Correcto";

	var magnitudAMedir;
	var tipoMagnitudAMedir;
	var magnitudMedida;
	var tipoMagnitudMedida;

	var valorMaximo;
	var valorMinimo;

	var selectorElement = document.getElementById('selector');	
	selectorElement.addEventListener("click", determinaPosicionSelector);
	selectorElement.addEventListener("auxclick", determinaPosicionSelector);

	var sondaRojaElement = document.getElementById('sondaRoja'), posicionXSondaRoja = 0, posicionYSondaRoja = 0;
	var sondaRojaConectadaAFASE, sondaRojaConectadaANEUTRO;
	sondaRojaElement.addEventListener("mousedown", dragStartSondaRoja);

	var sondaNegraElement = document.getElementById('sondaNegra'), posicionXSondaNegra = 0, posicionYSondaNegra = 0;
	var sondaNegraConectadaAFASE, sondaNegraConectadaANEUTRO;
	sondaNegraElement.addEventListener("mousedown", dragStartSondaNegra);

	var conectorRojoElement = document.getElementById('conectorRojo'), posicionXConectorRojo = 0, posicionYConectorRojo = 0;
	var conectorRojoConectadoA10A, conectorRojoConectadoAVRA;
	conectorRojoElement.addEventListener("mousedown", dragStartConectorRojo);

	var conectorNegroElement = document.getElementById('conectorNegro'), posicionXConectorNegro = 0, posicionYConectorNegro = 0;
	var conectorNegroConectadoACOM;
	conectorNegroElement.addEventListener("mousedown", dragStartConectorNegro);

	var audioExplosionElement = document.getElementById("audioExplosion");

//-----------------------------------------------------------------------------------------------------------------------
function determinaPosicionSelector(e)
{
	event.preventDefault();
	//console.log("button:" + event.button);
	//console.log("which:" + event.which);
	if (indicePosicionSelector == 0 && event.button == 0)
		indicePosicionSelector = 23;
	else if (indicePosicionSelector == 23 && event.button == 2)
		indicePosicionSelector = 0;
	else
		if (indicePosicionSelector <=23)
			if (event.button == 0)
				indicePosicionSelector = indicePosicionSelector - 1;
			else
				indicePosicionSelector = indicePosicionSelector + 1;
		else 
			indicePosicionSelector = 0;
	 
	document.getElementById("selector").src = posicionSelector[indicePosicionSelector];

	configuraPolimetroSegunSelector(indicePosicionSelector);
	compruebaConexion();
	clearInterval(myVar);
	actualizaVisor();
}

//-----------------------------------------------------------------------------------------------------------------------
function configuraPolimetroSegunSelector(indicePosicionSelector)
{
	switch (indicePosicionSelector) {
	case 0:  //console.log("Multímetro apagado");
		document.getElementById("D7S_1a").style.visibility = "hidden";
		document.getElementById("D7S_1b").style.visibility = "hidden";
		document.getElementById("D7S_1c").style.visibility = "hidden";
		document.getElementById("D7S_1d").style.visibility = "hidden";
		document.getElementById("D7S_1e").style.visibility = "hidden";
		document.getElementById("D7S_1f").style.visibility = "hidden";
		document.getElementById("D7S_1g").style.visibility = "hidden";
		document.getElementById("D7S_2a").style.visibility = "hidden";
		document.getElementById("D7S_2b").style.visibility = "hidden";
		document.getElementById("D7S_2c").style.visibility = "hidden";
		document.getElementById("D7S_2d").style.visibility = "hidden";
		document.getElementById("D7S_2e").style.visibility = "hidden";
		document.getElementById("D7S_2f").style.visibility = "hidden";
		document.getElementById("D7S_2g").style.visibility = "hidden";
		document.getElementById("D7S_3a").style.visibility = "hidden";
		document.getElementById("D7S_3b").style.visibility = "hidden";
		document.getElementById("D7S_3c").style.visibility = "hidden";
		document.getElementById("D7S_3d").style.visibility = "hidden";
		document.getElementById("D7S_3e").style.visibility = "hidden";
		document.getElementById("D7S_3f").style.visibility = "hidden";
		document.getElementById("D7S_3g").style.visibility = "hidden";
		document.getElementById("D7S_4a").style.visibility = "hidden";
		document.getElementById("D7S_4b").style.visibility = "hidden";
		document.getElementById("D7S_4c").style.visibility = "hidden";
		document.getElementById("D7S_4d").style.visibility = "hidden";
		document.getElementById("D7S_4e").style.visibility = "hidden";
		document.getElementById("D7S_4f").style.visibility = "hidden";
		document.getElementById("D7S_4g").style.visibility = "hidden";
		document.getElementById("signo").style.visibility = "hidden";
		document.getElementById("punto1").style.visibility = "hidden";
		document.getElementById("punto2").style.visibility = "hidden";
		document.getElementById("punto3").style.visibility = "hidden";
		document.getElementById("punto4").style.visibility = "hidden";
		document.getElementById("ohmios").style.visibility = "hidden";
		document.getElementById("kiloohmios").style.visibility = "hidden";
		document.getElementById("megaohmios").style.visibility = "hidden";
		document.getElementById("voltios").style.visibility = "hidden";
		document.getElementById("milivoltios").style.visibility = "hidden";
		document.getElementById("hfe").style.visibility = "hidden";
		document.getElementById("miliamperios").style.visibility = "hidden";
		document.getElementById("microamperios").style.visibility = "hidden";
		document.getElementById("AC").style.visibility = "hidden";
		
		break;

	case 1:  //console.log("VDC - 200mV");
		document.getElementById("D7S_1a").style.visibility = "visible";
		document.getElementById("D7S_1a").style.fill = "#141414";
		document.getElementById("D7S_1b").style.visibility = "visible";
		document.getElementById("D7S_1b").style.fill = "#141414";
		document.getElementById("D7S_1c").style.visibility = "visible";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.visibility = "visible";
		document.getElementById("D7S_1d").style.fill = "#141414";
		document.getElementById("D7S_1e").style.visibility = "visible";
		document.getElementById("D7S_1e").style.fill = "#141414";
		document.getElementById("D7S_1f").style.visibility = "visible";
		document.getElementById("D7S_1f").style.fill = "#141414";
		document.getElementById("D7S_1g").style.visibility = "visible";
		document.getElementById("D7S_1g").style.fill = "#808080";

		document.getElementById("D7S_2a").style.visibility = "visible";
		document.getElementById("D7S_2a").style.fill = "#141414";
		document.getElementById("D7S_2b").style.visibility = "visible";
		document.getElementById("D7S_2b").style.fill = "#141414";
		document.getElementById("D7S_2c").style.visibility = "visible";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.visibility = "visible";
		document.getElementById("D7S_2d").style.fill = "#141414";
		document.getElementById("D7S_2e").style.visibility = "visible";
		document.getElementById("D7S_2e").style.fill = "#141414";
		document.getElementById("D7S_2f").style.visibility = "visible";
		document.getElementById("D7S_2f").style.fill = "#141414";
		document.getElementById("D7S_2g").style.visibility = "visible";
		document.getElementById("D7S_2g").style.fill = "#808080";

		document.getElementById("D7S_3a").style.visibility = "visible";
		document.getElementById("D7S_3a").style.fill = "#141414";
		document.getElementById("D7S_3b").style.visibility = "visible";
		document.getElementById("D7S_3b").style.fill = "#141414";
		document.getElementById("D7S_3c").style.visibility = "visible";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.visibility = "visible";
		document.getElementById("D7S_3d").style.fill = "#141414";
		document.getElementById("D7S_3e").style.visibility = "visible";
		document.getElementById("D7S_3e").style.fill = "#141414";
		document.getElementById("D7S_3f").style.visibility = "visible";
		document.getElementById("D7S_3f").style.fill = "#141414";
		document.getElementById("D7S_3g").style.visibility = "visible";
		document.getElementById("D7S_3g").style.fill = "#808080";

		document.getElementById("D7S_4a").style.visibility = "hidden";
		document.getElementById("D7S_4b").style.visibility = "visible";
		document.getElementById("D7S_4b").style.fill = "#808080";
		document.getElementById("D7S_4c").style.visibility = "visible";
		document.getElementById("D7S_4c").style.fill = "#808080";
		document.getElementById("D7S_4d").style.visibility = "hidden";
		document.getElementById("D7S_4e").style.visibility = "hidden";
		document.getElementById("D7S_4f").style.visibility = "hidden";
		document.getElementById("D7S_4g").style.visibility = "hidden";
		document.getElementById("signo").style.visibility = "visible";
		document.getElementById("signo").style.fill = "#808080";
		document.getElementById("punto1").style.visibility = "visible";
		document.getElementById("punto1").style.fill = "#808080";
		document.getElementById("punto2").style.visibility = "visible";
		document.getElementById("punto2").style.fill = "#808080";
		document.getElementById("punto3").style.visibility = "visible";
		document.getElementById("punto3").style.fill = "#141414";
		document.getElementById("punto4").style.visibility = "visible";
		document.getElementById("punto4").style.fill = "#808080";
		document.getElementById("ohmios").style.visibility = "visible";
		document.getElementById("ohmios").style.color = "#808080";
		document.getElementById("kiloohmios").style.visibility = "visible";
		document.getElementById("kiloohmios").style.color = "#808080";
		document.getElementById("megaohmios").style.visibility = "visible";
		document.getElementById("megaohmios").style.color = "#808080";
		document.getElementById("voltios").style.visibility = "visible";
		document.getElementById("voltios").style.color = "#808080";
		document.getElementById("milivoltios").style.visibility = "visible";
		document.getElementById("milivoltios").style.color = "#141414";
		document.getElementById("hfe").style.visibility = "visible";
		document.getElementById("hfe").style.color = "#808080";
		document.getElementById("miliamperios").style.visibility = "visible";
		document.getElementById("miliamperios").style.color = "#808080";
		document.getElementById("microamperios").style.visibility = "visible";
		document.getElementById("microamperios").style.color = "#808080";
		document.getElementById("AC").style.visibility = "visible";
		document.getElementById("AC").style.color = "#808080";
		
		magnitudAMedir = "V";
		tipoMagnitudAMedir = "DC";
		valorMaximo = .1999;
		valorMinimo = -.1999;
		
		break;

	case 2:  //console.log("VDC - 2V");
		document.getElementById("D7S_1a").style.visibility = "visible";
		document.getElementById("D7S_1a").style.fill = "#141414";
		document.getElementById("D7S_1b").style.visibility = "visible";
		document.getElementById("D7S_1b").style.fill = "#141414";
		document.getElementById("D7S_1c").style.visibility = "visible";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.visibility = "visible";
		document.getElementById("D7S_1d").style.fill = "#141414";
		document.getElementById("D7S_1e").style.visibility = "visible";
		document.getElementById("D7S_1e").style.fill = "#141414";
		document.getElementById("D7S_1f").style.visibility = "visible";
		document.getElementById("D7S_1f").style.fill = "#141414";
		document.getElementById("D7S_1g").style.visibility = "visible";
		document.getElementById("D7S_1g").style.fill = "#808080";

		document.getElementById("D7S_2a").style.visibility = "visible";
		document.getElementById("D7S_2a").style.fill = "#141414";
		document.getElementById("D7S_2b").style.visibility = "visible";
		document.getElementById("D7S_2b").style.fill = "#141414";
		document.getElementById("D7S_2c").style.visibility = "visible";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.visibility = "visible";
		document.getElementById("D7S_2d").style.fill = "#141414";
		document.getElementById("D7S_2e").style.visibility = "visible";
		document.getElementById("D7S_2e").style.fill = "#141414";
		document.getElementById("D7S_2f").style.visibility = "visible";
		document.getElementById("D7S_2f").style.fill = "#141414";
		document.getElementById("D7S_2g").style.visibility = "visible";
		document.getElementById("D7S_2g").style.fill = "#808080";

		document.getElementById("D7S_3a").style.visibility = "visible";
		document.getElementById("D7S_3a").style.fill = "#141414";
		document.getElementById("D7S_3b").style.visibility = "visible";
		document.getElementById("D7S_3b").style.fill = "#141414";
		document.getElementById("D7S_3c").style.visibility = "visible";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.visibility = "visible";
		document.getElementById("D7S_3d").style.fill = "#141414";
		document.getElementById("D7S_3e").style.visibility = "visible";
		document.getElementById("D7S_3e").style.fill = "#141414";
		document.getElementById("D7S_3f").style.visibility = "visible";
		document.getElementById("D7S_3f").style.fill = "#141414";
		document.getElementById("D7S_3g").style.visibility = "visible";
		document.getElementById("D7S_3g").style.fill = "#808080";

		document.getElementById("D7S_4a").style.visibility = "hidden";
		document.getElementById("D7S_4b").style.visibility = "visible";
		document.getElementById("D7S_4b").style.fill = "#808080";
		document.getElementById("D7S_4c").style.visibility = "visible";
		document.getElementById("D7S_4c").style.fill = "#808080";
		document.getElementById("D7S_4d").style.visibility = "hidden";
		document.getElementById("D7S_4e").style.visibility = "hidden";
		document.getElementById("D7S_4f").style.visibility = "hidden";
		document.getElementById("D7S_4g").style.visibility = "hidden";
		document.getElementById("signo").style.visibility = "visible";
		document.getElementById("signo").style.fill = "#808080";
		document.getElementById("punto1").style.visibility = "visible";
		document.getElementById("punto1").style.fill = "#141414";
		document.getElementById("punto2").style.visibility = "visible";
		document.getElementById("punto2").style.fill = "#808080";
		document.getElementById("punto3").style.visibility = "visible";
		document.getElementById("punto3").style.fill = "#808080";
		document.getElementById("punto4").style.visibility = "visible";
		document.getElementById("punto4").style.fill = "#808080";
		document.getElementById("ohmios").style.visibility = "visible";
		document.getElementById("ohmios").style.color = "#808080";
		document.getElementById("kiloohmios").style.visibility = "visible";
		document.getElementById("kiloohmios").style.color = "#808080";
		document.getElementById("megaohmios").style.visibility = "visible";
		document.getElementById("megaohmios").style.color = "#808080";
		document.getElementById("voltios").style.visibility = "visible";
		document.getElementById("voltios").style.color = "#141414";
		document.getElementById("milivoltios").style.visibility = "visible";
		document.getElementById("milivoltios").style.color = "#808080";
		document.getElementById("hfe").style.visibility = "visible";
		document.getElementById("hfe").style.color = "#808080";
		document.getElementById("miliamperios").style.visibility = "visible";
		document.getElementById("miliamperios").style.color = "#808080";
		document.getElementById("microamperios").style.visibility = "visible";
		document.getElementById("microamperios").style.color = "#808080";
		document.getElementById("AC").style.visibility = "visible";
		document.getElementById("AC").style.color = "#808080";

		magnitudAMedir = "V";
		tipoMagnitudAMedir = "DC"
		valorMaximo = 1.999;
		valorMinimo = -1.999;
		
		break;

	case 3:  //console.log("VDC - 20V");
		document.getElementById("D7S_1a").style.visibility = "visible";
		document.getElementById("D7S_1a").style.fill = "#141414";
		document.getElementById("D7S_1b").style.visibility = "visible";
		document.getElementById("D7S_1b").style.fill = "#141414";
		document.getElementById("D7S_1c").style.visibility = "visible";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.visibility = "visible";
		document.getElementById("D7S_1d").style.fill = "#141414";
		document.getElementById("D7S_1e").style.visibility = "visible";
		document.getElementById("D7S_1e").style.fill = "#141414";
		document.getElementById("D7S_1f").style.visibility = "visible";
		document.getElementById("D7S_1f").style.fill = "#141414";
		document.getElementById("D7S_1g").style.visibility = "visible";
		document.getElementById("D7S_1g").style.fill = "#808080";

		document.getElementById("D7S_2a").style.visibility = "visible";
		document.getElementById("D7S_2a").style.fill = "#141414";
		document.getElementById("D7S_2b").style.visibility = "visible";
		document.getElementById("D7S_2b").style.fill = "#141414";
		document.getElementById("D7S_2c").style.visibility = "visible";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.visibility = "visible";
		document.getElementById("D7S_2d").style.fill = "#141414";
		document.getElementById("D7S_2e").style.visibility = "visible";
		document.getElementById("D7S_2e").style.fill = "#141414";
		document.getElementById("D7S_2f").style.visibility = "visible";
		document.getElementById("D7S_2f").style.fill = "#141414";
		document.getElementById("D7S_2g").style.visibility = "visible";
		document.getElementById("D7S_2g").style.fill = "#808080";

		document.getElementById("D7S_3a").style.visibility = "visible";
		document.getElementById("D7S_3a").style.fill = "#141414";
		document.getElementById("D7S_3b").style.visibility = "visible";
		document.getElementById("D7S_3b").style.fill = "#141414";
		document.getElementById("D7S_3c").style.visibility = "visible";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.visibility = "visible";
		document.getElementById("D7S_3d").style.fill = "#141414";
		document.getElementById("D7S_3e").style.visibility = "visible";
		document.getElementById("D7S_3e").style.fill = "#141414";
		document.getElementById("D7S_3f").style.visibility = "visible";
		document.getElementById("D7S_3f").style.fill = "#141414";
		document.getElementById("D7S_3g").style.visibility = "visible";
		document.getElementById("D7S_3g").style.fill = "#808080";

		document.getElementById("D7S_4a").style.visibility = "hidden";
		document.getElementById("D7S_4b").style.visibility = "visible";
		document.getElementById("D7S_4b").style.fill = "#808080";
		document.getElementById("D7S_4c").style.visibility = "visible";
		document.getElementById("D7S_4c").style.fill = "#808080";
		document.getElementById("D7S_4d").style.visibility = "hidden";
		document.getElementById("D7S_4e").style.visibility = "hidden";
		document.getElementById("D7S_4f").style.visibility = "hidden";
		document.getElementById("D7S_4g").style.visibility = "hidden";
		document.getElementById("signo").style.visibility = "visible";
		document.getElementById("signo").style.fill = "#808080";
		document.getElementById("punto1").style.visibility = "visible";
		document.getElementById("punto1").style.fill = "#808080";
		document.getElementById("punto2").style.visibility = "visible";
		document.getElementById("punto2").style.fill = "#141414";
		document.getElementById("punto3").style.visibility = "visible";
		document.getElementById("punto3").style.fill = "#808080";
		document.getElementById("punto4").style.visibility = "visible";
		document.getElementById("punto4").style.fill = "#808080";
		document.getElementById("ohmios").style.visibility = "visible";
		document.getElementById("ohmios").style.color = "#808080";
		document.getElementById("kiloohmios").style.visibility = "visible";
		document.getElementById("kiloohmios").style.color = "#808080";
		document.getElementById("megaohmios").style.visibility = "visible";
		document.getElementById("megaohmios").style.color = "#808080";
		document.getElementById("voltios").style.visibility = "visible";
		document.getElementById("voltios").style.color = "#141414";
		document.getElementById("milivoltios").style.visibility = "visible";
		document.getElementById("milivoltios").style.color = "#808080";
		document.getElementById("hfe").style.visibility = "visible";
		document.getElementById("hfe").style.color = "#808080";
		document.getElementById("miliamperios").style.visibility = "visible";
		document.getElementById("miliamperios").style.color = "#808080";
		document.getElementById("microamperios").style.visibility = "visible";
		document.getElementById("microamperios").style.color = "#808080";
		document.getElementById("AC").style.visibility = "visible";
		document.getElementById("AC").style.color = "#808080";
		
		magnitudAMedir = "V";
		tipoMagnitudAMedir = "DC";
		valorMaximo = 19.99;
		valorMinimo = -19.99;

		break;

	case 4:  //console.log("VDC - 200V");
		document.getElementById("D7S_1a").style.visibility = "visible";
		document.getElementById("D7S_1a").style.fill = "#141414";
		document.getElementById("D7S_1b").style.visibility = "visible";
		document.getElementById("D7S_1b").style.fill = "#141414";
		document.getElementById("D7S_1c").style.visibility = "visible";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.visibility = "visible";
		document.getElementById("D7S_1d").style.fill = "#141414";
		document.getElementById("D7S_1e").style.visibility = "visible";
		document.getElementById("D7S_1e").style.fill = "#141414";
		document.getElementById("D7S_1f").style.visibility = "visible";
		document.getElementById("D7S_1f").style.fill = "#141414";
		document.getElementById("D7S_1g").style.visibility = "visible";
		document.getElementById("D7S_1g").style.fill = "#808080";

		document.getElementById("D7S_2a").style.visibility = "visible";
		document.getElementById("D7S_2a").style.fill = "#141414";
		document.getElementById("D7S_2b").style.visibility = "visible";
		document.getElementById("D7S_2b").style.fill = "#141414";
		document.getElementById("D7S_2c").style.visibility = "visible";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.visibility = "visible";
		document.getElementById("D7S_2d").style.fill = "#141414";
		document.getElementById("D7S_2e").style.visibility = "visible";
		document.getElementById("D7S_2e").style.fill = "#141414";
		document.getElementById("D7S_2f").style.visibility = "visible";
		document.getElementById("D7S_2f").style.fill = "#141414";
		document.getElementById("D7S_2g").style.visibility = "visible";
		document.getElementById("D7S_2g").style.fill = "#808080";

		document.getElementById("D7S_3a").style.visibility = "visible";
		document.getElementById("D7S_3a").style.fill = "#141414";
		document.getElementById("D7S_3b").style.visibility = "visible";
		document.getElementById("D7S_3b").style.fill = "#141414";
		document.getElementById("D7S_3c").style.visibility = "visible";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.visibility = "visible";
		document.getElementById("D7S_3d").style.fill = "#141414";
		document.getElementById("D7S_3e").style.visibility = "visible";
		document.getElementById("D7S_3e").style.fill = "#141414";
		document.getElementById("D7S_3f").style.visibility = "visible";
		document.getElementById("D7S_3f").style.fill = "#141414";
		document.getElementById("D7S_3g").style.visibility = "visible";
		document.getElementById("D7S_3g").style.fill = "#808080";

		document.getElementById("D7S_4a").style.visibility = "hidden";
		document.getElementById("D7S_4b").style.visibility = "visible";
		document.getElementById("D7S_4b").style.fill = "#808080";
		document.getElementById("D7S_4c").style.visibility = "visible";
		document.getElementById("D7S_4c").style.fill = "#808080";
		document.getElementById("D7S_4d").style.visibility = "hidden";
		document.getElementById("D7S_4e").style.visibility = "hidden";
		document.getElementById("D7S_4f").style.visibility = "hidden";
		document.getElementById("D7S_4g").style.visibility = "hidden";
		document.getElementById("signo").style.visibility = "visible";
		document.getElementById("signo").style.fill = "#808080";
		document.getElementById("punto1").style.visibility = "visible";
		document.getElementById("punto1").style.fill = "#808080";
		document.getElementById("punto2").style.visibility = "visible";
		document.getElementById("punto2").style.fill = "#808080";
		document.getElementById("punto3").style.visibility = "visible";
		document.getElementById("punto3").style.fill = "#141414";
		document.getElementById("punto4").style.visibility = "visible";
		document.getElementById("punto4").style.fill = "#808080";
		document.getElementById("ohmios").style.visibility = "visible";
		document.getElementById("ohmios").style.color = "#808080";
		document.getElementById("kiloohmios").style.visibility = "visible";
		document.getElementById("kiloohmios").style.color = "#808080";
		document.getElementById("megaohmios").style.visibility = "visible";
		document.getElementById("megaohmios").style.color = "#808080";
		document.getElementById("voltios").style.visibility = "visible";
		document.getElementById("voltios").style.color = "#141414";
		document.getElementById("milivoltios").style.visibility = "visible";
		document.getElementById("milivoltios").style.color = "#808080";
		document.getElementById("hfe").style.visibility = "visible";
		document.getElementById("hfe").style.color = "#808080";
		document.getElementById("miliamperios").style.visibility = "visible";
		document.getElementById("miliamperios").style.color = "#808080";
		document.getElementById("microamperios").style.visibility = "visible";
		document.getElementById("microamperios").style.color = "#808080";
		document.getElementById("AC").style.visibility = "visible";
		document.getElementById("AC").style.color = "#808080";
		
		magnitudAMedir = "V";
		tipoMagnitudAMedir = "DC";
		valorMaximo = 199.9;
		valorMinimo = -199.9;

		break;

	case 5:  //console.log("VDC - 1000V");
		document.getElementById("D7S_1a").style.visibility = "visible";
		document.getElementById("D7S_1a").style.fill = "#141414";
		document.getElementById("D7S_1b").style.visibility = "visible";
		document.getElementById("D7S_1b").style.fill = "#141414";
		document.getElementById("D7S_1c").style.visibility = "visible";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.visibility = "visible";
		document.getElementById("D7S_1d").style.fill = "#141414";
		document.getElementById("D7S_1e").style.visibility = "visible";
		document.getElementById("D7S_1e").style.fill = "#141414";
		document.getElementById("D7S_1f").style.visibility = "visible";
		document.getElementById("D7S_1f").style.fill = "#141414";
		document.getElementById("D7S_1g").style.visibility = "visible";
		document.getElementById("D7S_1g").style.fill = "#808080";

		document.getElementById("D7S_2a").style.visibility = "visible";
		document.getElementById("D7S_2a").style.fill = "#141414";
		document.getElementById("D7S_2b").style.visibility = "visible";
		document.getElementById("D7S_2b").style.fill = "#141414";
		document.getElementById("D7S_2c").style.visibility = "visible";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.visibility = "visible";
		document.getElementById("D7S_2d").style.fill = "#141414";
		document.getElementById("D7S_2e").style.visibility = "visible";
		document.getElementById("D7S_2e").style.fill = "#141414";
		document.getElementById("D7S_2f").style.visibility = "visible";
		document.getElementById("D7S_2f").style.fill = "#141414";
		document.getElementById("D7S_2g").style.visibility = "visible";
		document.getElementById("D7S_2g").style.fill = "#808080";

		document.getElementById("D7S_3a").style.visibility = "visible";
		document.getElementById("D7S_3a").style.fill = "#141414";
		document.getElementById("D7S_3b").style.visibility = "visible";
		document.getElementById("D7S_3b").style.fill = "#141414";
		document.getElementById("D7S_3c").style.visibility = "visible";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.visibility = "visible";
		document.getElementById("D7S_3d").style.fill = "#141414";
		document.getElementById("D7S_3e").style.visibility = "visible";
		document.getElementById("D7S_3e").style.fill = "#141414";
		document.getElementById("D7S_3f").style.visibility = "visible";
		document.getElementById("D7S_3f").style.fill = "#141414";
		document.getElementById("D7S_3g").style.visibility = "visible";
		document.getElementById("D7S_3g").style.fill = "#808080";

		document.getElementById("D7S_4a").style.visibility = "hidden";
		document.getElementById("D7S_4b").style.visibility = "visible";
		document.getElementById("D7S_4b").style.fill = "#808080";
		document.getElementById("D7S_4c").style.visibility = "visible";
		document.getElementById("D7S_4c").style.fill = "#808080";
		document.getElementById("D7S_4d").style.visibility = "hidden";
		document.getElementById("D7S_4e").style.visibility = "hidden";
		document.getElementById("D7S_4f").style.visibility = "hidden";
		document.getElementById("D7S_4g").style.visibility = "hidden";
		document.getElementById("signo").style.visibility = "visible";
		document.getElementById("signo").style.fill = "#808080";
		document.getElementById("punto1").style.visibility = "visible";
		document.getElementById("punto1").style.fill = "#808080";
		document.getElementById("punto2").style.visibility = "visible";
		document.getElementById("punto2").style.fill = "#808080";
		document.getElementById("punto3").style.visibility = "visible";
		document.getElementById("punto3").style.fill = "#808080";
		document.getElementById("punto4").style.visibility = "visible";
		document.getElementById("punto4").style.fill = "#808080";
		document.getElementById("ohmios").style.visibility = "visible";
		document.getElementById("ohmios").style.color = "#808080";
		document.getElementById("kiloohmios").style.visibility = "visible";
		document.getElementById("kiloohmios").style.color = "#808080";
		document.getElementById("megaohmios").style.visibility = "visible";
		document.getElementById("megaohmios").style.color = "#808080";
		document.getElementById("voltios").style.visibility = "visible";
		document.getElementById("voltios").style.color = "#141414";
		document.getElementById("milivoltios").style.visibility = "visible";
		document.getElementById("milivoltios").style.color = "#808080";
		document.getElementById("hfe").style.visibility = "visible";
		document.getElementById("hfe").style.color = "#808080";
		document.getElementById("miliamperios").style.visibility = "visible";
		document.getElementById("miliamperios").style.color = "#808080";
		document.getElementById("microamperios").style.visibility = "visible";
		document.getElementById("microamperios").style.color = "#808080";
		document.getElementById("AC").style.visibility = "visible";
		document.getElementById("AC").style.color = "#808080";
		
		magnitudAMedir = "V";
		tipoMagnitudAMedir = "DC";
		valorMaximo = 999;
		valorMinimo = -999;

		break;

	case 6:  //console.log("VAC - 750V");
		document.getElementById("D7S_1a").style.visibility = "visible";
		document.getElementById("D7S_1a").style.fill = "#141414";
		document.getElementById("D7S_1b").style.visibility = "visible";
		document.getElementById("D7S_1b").style.fill = "#141414";
		document.getElementById("D7S_1c").style.visibility = "visible";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.visibility = "visible";
		document.getElementById("D7S_1d").style.fill = "#141414";
		document.getElementById("D7S_1e").style.visibility = "visible";
		document.getElementById("D7S_1e").style.fill = "#141414";
		document.getElementById("D7S_1f").style.visibility = "visible";
		document.getElementById("D7S_1f").style.fill = "#141414";
		document.getElementById("D7S_1g").style.visibility = "visible";
		document.getElementById("D7S_1g").style.fill = "#808080";

		document.getElementById("D7S_2a").style.visibility = "visible";
		document.getElementById("D7S_2a").style.fill = "#141414";
		document.getElementById("D7S_2b").style.visibility = "visible";
		document.getElementById("D7S_2b").style.fill = "#141414";
		document.getElementById("D7S_2c").style.visibility = "visible";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.visibility = "visible";
		document.getElementById("D7S_2d").style.fill = "#141414";
		document.getElementById("D7S_2e").style.visibility = "visible";
		document.getElementById("D7S_2e").style.fill = "#141414";
		document.getElementById("D7S_2f").style.visibility = "visible";
		document.getElementById("D7S_2f").style.fill = "#141414";
		document.getElementById("D7S_2g").style.visibility = "visible";
		document.getElementById("D7S_2g").style.fill = "#808080";

		document.getElementById("D7S_3a").style.visibility = "visible";
		document.getElementById("D7S_3a").style.fill = "#141414";
		document.getElementById("D7S_3b").style.visibility = "visible";
		document.getElementById("D7S_3b").style.fill = "#141414";
		document.getElementById("D7S_3c").style.visibility = "visible";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.visibility = "visible";
		document.getElementById("D7S_3d").style.fill = "#141414";
		document.getElementById("D7S_3e").style.visibility = "visible";
		document.getElementById("D7S_3e").style.fill = "#141414";
		document.getElementById("D7S_3f").style.visibility = "visible";
		document.getElementById("D7S_3f").style.fill = "#141414";
		document.getElementById("D7S_3g").style.visibility = "visible";
		document.getElementById("D7S_3g").style.fill = "#808080";

		document.getElementById("D7S_4a").style.visibility = "hidden";
		document.getElementById("D7S_4b").style.visibility = "visible";
		document.getElementById("D7S_4b").style.fill = "#808080";
		document.getElementById("D7S_4c").style.visibility = "visible";
		document.getElementById("D7S_4c").style.fill = "#808080";
		document.getElementById("D7S_4d").style.visibility = "hidden";
		document.getElementById("D7S_4e").style.visibility = "hidden";
		document.getElementById("D7S_4f").style.visibility = "hidden";
		document.getElementById("D7S_4g").style.visibility = "hidden";
		document.getElementById("signo").style.visibility = "visible";
		document.getElementById("signo").style.fill = "#808080";
		document.getElementById("punto1").style.visibility = "visible";
		document.getElementById("punto1").style.fill = "#808080";
		document.getElementById("punto2").style.visibility = "visible";
		document.getElementById("punto2").style.fill = "#808080";
		document.getElementById("punto3").style.visibility = "visible";
		document.getElementById("punto3").style.fill = "#808080";
		document.getElementById("punto4").style.visibility = "visible";
		document.getElementById("punto4").style.fill = "#808080";
		document.getElementById("ohmios").style.visibility = "visible";
		document.getElementById("ohmios").style.color = "#808080";
		document.getElementById("kiloohmios").style.visibility = "visible";
		document.getElementById("kiloohmios").style.color = "#808080";
		document.getElementById("megaohmios").style.visibility = "visible";
		document.getElementById("megaohmios").style.color = "#808080";
		document.getElementById("voltios").style.visibility = "visible";
		document.getElementById("voltios").style.color = "#141414";
		document.getElementById("milivoltios").style.visibility = "visible";
		document.getElementById("milivoltios").style.color = "#808080";
		document.getElementById("hfe").style.visibility = "visible";
		document.getElementById("hfe").style.color = "#808080";
		document.getElementById("miliamperios").style.visibility = "visible";
		document.getElementById("miliamperios").style.color = "#808080";
		document.getElementById("microamperios").style.visibility = "visible";
		document.getElementById("microamperios").style.color = "#808080";
		document.getElementById("AC").style.visibility = "visible";
		document.getElementById("AC").style.color = "#141414";
		
		magnitudAMedir = "V";
		tipoMagnitudAMedir = "AC";
		valorMaximo = 749;
		valorMinimo = -749;

		break;

	case 7:  //console.log("VAC - 200V");
		document.getElementById("D7S_1a").style.visibility = "visible";
		document.getElementById("D7S_1a").style.fill = "#141414";
		document.getElementById("D7S_1b").style.visibility = "visible";
		document.getElementById("D7S_1b").style.fill = "#141414";
		document.getElementById("D7S_1c").style.visibility = "visible";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.visibility = "visible";
		document.getElementById("D7S_1d").style.fill = "#141414";
		document.getElementById("D7S_1e").style.visibility = "visible";
		document.getElementById("D7S_1e").style.fill = "#141414";
		document.getElementById("D7S_1f").style.visibility = "visible";
		document.getElementById("D7S_1f").style.fill = "#141414";
		document.getElementById("D7S_1g").style.visibility = "visible";
		document.getElementById("D7S_1g").style.fill = "#808080";

		document.getElementById("D7S_2a").style.visibility = "visible";
		document.getElementById("D7S_2a").style.fill = "#141414";
		document.getElementById("D7S_2b").style.visibility = "visible";
		document.getElementById("D7S_2b").style.fill = "#141414";
		document.getElementById("D7S_2c").style.visibility = "visible";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.visibility = "visible";
		document.getElementById("D7S_2d").style.fill = "#141414";
		document.getElementById("D7S_2e").style.visibility = "visible";
		document.getElementById("D7S_2e").style.fill = "#141414";
		document.getElementById("D7S_2f").style.visibility = "visible";
		document.getElementById("D7S_2f").style.fill = "#141414";
		document.getElementById("D7S_2g").style.visibility = "visible";
		document.getElementById("D7S_2g").style.fill = "#808080";

		document.getElementById("D7S_3a").style.visibility = "visible";
		document.getElementById("D7S_3a").style.fill = "#141414";
		document.getElementById("D7S_3b").style.visibility = "visible";
		document.getElementById("D7S_3b").style.fill = "#141414";
		document.getElementById("D7S_3c").style.visibility = "visible";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.visibility = "visible";
		document.getElementById("D7S_3d").style.fill = "#141414";
		document.getElementById("D7S_3e").style.visibility = "visible";
		document.getElementById("D7S_3e").style.fill = "#141414";
		document.getElementById("D7S_3f").style.visibility = "visible";
		document.getElementById("D7S_3f").style.fill = "#141414";
		document.getElementById("D7S_3g").style.visibility = "visible";
		document.getElementById("D7S_3g").style.fill = "#808080";

		document.getElementById("D7S_4a").style.visibility = "hidden";
		document.getElementById("D7S_4b").style.visibility = "visible";
		document.getElementById("D7S_4b").style.fill = "#808080";
		document.getElementById("D7S_4c").style.visibility = "visible";
		document.getElementById("D7S_4c").style.fill = "#808080";
		document.getElementById("D7S_4d").style.visibility = "hidden";
		document.getElementById("D7S_4e").style.visibility = "hidden";
		document.getElementById("D7S_4f").style.visibility = "hidden";
		document.getElementById("D7S_4g").style.visibility = "hidden";
		document.getElementById("signo").style.visibility = "visible";
		document.getElementById("signo").style.fill = "#808080";
		document.getElementById("punto1").style.visibility = "visible";
		document.getElementById("punto1").style.fill = "#808080";
		document.getElementById("punto2").style.visibility = "visible";
		document.getElementById("punto2").style.fill = "#808080";
		document.getElementById("punto3").style.visibility = "visible";
		document.getElementById("punto3").style.fill = "#141414";
		document.getElementById("punto4").style.visibility = "visible";
		document.getElementById("punto4").style.fill = "#808080";
		document.getElementById("ohmios").style.visibility = "visible";
		document.getElementById("ohmios").style.color = "#808080";
		document.getElementById("kiloohmios").style.visibility = "visible";
		document.getElementById("kiloohmios").style.color = "#808080";
		document.getElementById("megaohmios").style.visibility = "visible";
		document.getElementById("megaohmios").style.color = "#808080";
		document.getElementById("voltios").style.visibility = "visible";
		document.getElementById("voltios").style.color = "#141414";
		document.getElementById("milivoltios").style.visibility = "visible";
		document.getElementById("milivoltios").style.color = "#808080";
		document.getElementById("hfe").style.visibility = "visible";
		document.getElementById("hfe").style.color = "#808080";
		document.getElementById("miliamperios").style.visibility = "visible";
		document.getElementById("miliamperios").style.color = "#808080";
		document.getElementById("microamperios").style.visibility = "visible";
		document.getElementById("microamperios").style.color = "#808080";
		document.getElementById("AC").style.visibility = "visible";
		document.getElementById("AC").style.color = "#141414";
		
		magnitudAMedir = "V";
		tipoMagnitudAMedir = "AC";
		valorMaximo = 199.9;
		valorMinimo = -199.9;

		break;

	case 8:  //console.log("VAC - 20V");
		document.getElementById("D7S_1a").style.visibility = "visible";
		document.getElementById("D7S_1a").style.fill = "#141414";
		document.getElementById("D7S_1b").style.visibility = "visible";
		document.getElementById("D7S_1b").style.fill = "#141414";
		document.getElementById("D7S_1c").style.visibility = "visible";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.visibility = "visible";
		document.getElementById("D7S_1d").style.fill = "#141414";
		document.getElementById("D7S_1e").style.visibility = "visible";
		document.getElementById("D7S_1e").style.fill = "#141414";
		document.getElementById("D7S_1f").style.visibility = "visible";
		document.getElementById("D7S_1f").style.fill = "#141414";
		document.getElementById("D7S_1g").style.visibility = "visible";
		document.getElementById("D7S_1g").style.fill = "#808080";

		document.getElementById("D7S_2a").style.visibility = "visible";
		document.getElementById("D7S_2a").style.fill = "#141414";
		document.getElementById("D7S_2b").style.visibility = "visible";
		document.getElementById("D7S_2b").style.fill = "#141414";
		document.getElementById("D7S_2c").style.visibility = "visible";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.visibility = "visible";
		document.getElementById("D7S_2d").style.fill = "#141414";
		document.getElementById("D7S_2e").style.visibility = "visible";
		document.getElementById("D7S_2e").style.fill = "#141414";
		document.getElementById("D7S_2f").style.visibility = "visible";
		document.getElementById("D7S_2f").style.fill = "#141414";
		document.getElementById("D7S_2g").style.visibility = "visible";
		document.getElementById("D7S_2g").style.fill = "#808080";

		document.getElementById("D7S_3a").style.visibility = "visible";
		document.getElementById("D7S_3a").style.fill = "#141414";
		document.getElementById("D7S_3b").style.visibility = "visible";
		document.getElementById("D7S_3b").style.fill = "#141414";
		document.getElementById("D7S_3c").style.visibility = "visible";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.visibility = "visible";
		document.getElementById("D7S_3d").style.fill = "#141414";
		document.getElementById("D7S_3e").style.visibility = "visible";
		document.getElementById("D7S_3e").style.fill = "#141414";
		document.getElementById("D7S_3f").style.visibility = "visible";
		document.getElementById("D7S_3f").style.fill = "#141414";
		document.getElementById("D7S_3g").style.visibility = "visible";
		document.getElementById("D7S_3g").style.fill = "#808080";

		document.getElementById("D7S_4a").style.visibility = "hidden";
		document.getElementById("D7S_4b").style.visibility = "visible";
		document.getElementById("D7S_4b").style.fill = "#808080";
		document.getElementById("D7S_4c").style.visibility = "visible";
		document.getElementById("D7S_4c").style.fill = "#808080";
		document.getElementById("D7S_4d").style.visibility = "hidden";
		document.getElementById("D7S_4e").style.visibility = "hidden";
		document.getElementById("D7S_4f").style.visibility = "hidden";
		document.getElementById("D7S_4g").style.visibility = "hidden";
		document.getElementById("signo").style.visibility = "visible";
		document.getElementById("signo").style.fill = "#808080";
		document.getElementById("punto1").style.visibility = "visible";
		document.getElementById("punto1").style.fill = "#808080";
		document.getElementById("punto2").style.visibility = "visible";
		document.getElementById("punto2").style.fill = "#141414";
		document.getElementById("punto3").style.visibility = "visible";
		document.getElementById("punto3").style.fill = "#808080";
		document.getElementById("punto4").style.visibility = "visible";
		document.getElementById("punto4").style.fill = "#808080";
		document.getElementById("ohmios").style.visibility = "visible";
		document.getElementById("ohmios").style.color = "#808080";
		document.getElementById("kiloohmios").style.visibility = "visible";
		document.getElementById("kiloohmios").style.color = "#808080";
		document.getElementById("megaohmios").style.visibility = "visible";
		document.getElementById("megaohmios").style.color = "#808080";
		document.getElementById("voltios").style.visibility = "visible";
		document.getElementById("voltios").style.color = "#141414";
		document.getElementById("milivoltios").style.visibility = "visible";
		document.getElementById("milivoltios").style.color = "#808080";
		document.getElementById("hfe").style.visibility = "visible";
		document.getElementById("hfe").style.color = "#808080";
		document.getElementById("miliamperios").style.visibility = "visible";
		document.getElementById("miliamperios").style.color = "#808080";
		document.getElementById("microamperios").style.visibility = "visible";
		document.getElementById("microamperios").style.color = "#808080";
		document.getElementById("AC").style.visibility = "visible";
		document.getElementById("AC").style.color = "#141414";
		
		magnitudAMedir = "V";
		tipoMagnitudAMedir = "AC";
		valorMaximo = 19.99;
		valorMinimo = -19.99;

		break;

	case 9:  //console.log("VAC - 2V");
		document.getElementById("D7S_1a").style.visibility = "visible";
		document.getElementById("D7S_1a").style.fill = "#141414";
		document.getElementById("D7S_1b").style.visibility = "visible";
		document.getElementById("D7S_1b").style.fill = "#141414";
		document.getElementById("D7S_1c").style.visibility = "visible";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.visibility = "visible";
		document.getElementById("D7S_1d").style.fill = "#141414";
		document.getElementById("D7S_1e").style.visibility = "visible";
		document.getElementById("D7S_1e").style.fill = "#141414";
		document.getElementById("D7S_1f").style.visibility = "visible";
		document.getElementById("D7S_1f").style.fill = "#141414";
		document.getElementById("D7S_1g").style.visibility = "visible";
		document.getElementById("D7S_1g").style.fill = "#808080";

		document.getElementById("D7S_2a").style.visibility = "visible";
		document.getElementById("D7S_2a").style.fill = "#141414";
		document.getElementById("D7S_2b").style.visibility = "visible";
		document.getElementById("D7S_2b").style.fill = "#141414";
		document.getElementById("D7S_2c").style.visibility = "visible";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.visibility = "visible";
		document.getElementById("D7S_2d").style.fill = "#141414";
		document.getElementById("D7S_2e").style.visibility = "visible";
		document.getElementById("D7S_2e").style.fill = "#141414";
		document.getElementById("D7S_2f").style.visibility = "visible";
		document.getElementById("D7S_2f").style.fill = "#141414";
		document.getElementById("D7S_2g").style.visibility = "visible";
		document.getElementById("D7S_2g").style.fill = "#808080";

		document.getElementById("D7S_3a").style.visibility = "visible";
		document.getElementById("D7S_3a").style.fill = "#141414";
		document.getElementById("D7S_3b").style.visibility = "visible";
		document.getElementById("D7S_3b").style.fill = "#141414";
		document.getElementById("D7S_3c").style.visibility = "visible";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.visibility = "visible";
		document.getElementById("D7S_3d").style.fill = "#141414";
		document.getElementById("D7S_3e").style.visibility = "visible";
		document.getElementById("D7S_3e").style.fill = "#141414";
		document.getElementById("D7S_3f").style.visibility = "visible";
		document.getElementById("D7S_3f").style.fill = "#141414";
		document.getElementById("D7S_3g").style.visibility = "visible";
		document.getElementById("D7S_3g").style.fill = "#808080";

		document.getElementById("D7S_4a").style.visibility = "hidden";
		document.getElementById("D7S_4b").style.visibility = "visible";
		document.getElementById("D7S_4b").style.fill = "#808080";
		document.getElementById("D7S_4c").style.visibility = "visible";
		document.getElementById("D7S_4c").style.fill = "#808080";
		document.getElementById("D7S_4d").style.visibility = "hidden";
		document.getElementById("D7S_4e").style.visibility = "hidden";
		document.getElementById("D7S_4f").style.visibility = "hidden";
		document.getElementById("D7S_4g").style.visibility = "hidden";
		document.getElementById("signo").style.visibility = "visible";
		document.getElementById("signo").style.fill = "#808080";
		document.getElementById("punto1").style.visibility = "visible";
		document.getElementById("punto1").style.fill = "#141414";
		document.getElementById("punto2").style.visibility = "visible";
		document.getElementById("punto2").style.fill = "#808080";
		document.getElementById("punto3").style.visibility = "visible";
		document.getElementById("punto3").style.fill = "#808080";
		document.getElementById("punto4").style.visibility = "visible";
		document.getElementById("punto4").style.fill = "#808080";
		document.getElementById("ohmios").style.visibility = "visible";
		document.getElementById("ohmios").style.color = "#808080";
		document.getElementById("kiloohmios").style.visibility = "visible";
		document.getElementById("kiloohmios").style.color = "#808080";
		document.getElementById("megaohmios").style.visibility = "visible";
		document.getElementById("megaohmios").style.color = "#808080";
		document.getElementById("voltios").style.visibility = "visible";
		document.getElementById("voltios").style.color = "#141414";
		document.getElementById("milivoltios").style.visibility = "visible";
		document.getElementById("milivoltios").style.color = "#808080";
		document.getElementById("hfe").style.visibility = "visible";
		document.getElementById("hfe").style.color = "#808080";
		document.getElementById("miliamperios").style.visibility = "visible";
		document.getElementById("miliamperios").style.color = "#808080";
		document.getElementById("microamperios").style.visibility = "visible";
		document.getElementById("microamperios").style.color = "#808080";
		document.getElementById("AC").style.visibility = "visible";
		document.getElementById("AC").style.color = "#141414";
		
		magnitudAMedir = "V";
		tipoMagnitudAMedir = "AC";
		valorMaximo = 1.999;
		valorMinimo = -1.999;

		break;

	case 10: //console.log("hFE");
		document.getElementById("D7S_1a").style.visibility = "visible";
		document.getElementById("D7S_1a").style.fill = "#141414";
		document.getElementById("D7S_1b").style.visibility = "visible";
		document.getElementById("D7S_1b").style.fill = "#141414";
		document.getElementById("D7S_1c").style.visibility = "visible";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.visibility = "visible";
		document.getElementById("D7S_1d").style.fill = "#141414";
		document.getElementById("D7S_1e").style.visibility = "visible";
		document.getElementById("D7S_1e").style.fill = "#141414";
		document.getElementById("D7S_1f").style.visibility = "visible";
		document.getElementById("D7S_1f").style.fill = "#141414";
		document.getElementById("D7S_1g").style.visibility = "visible";
		document.getElementById("D7S_1g").style.fill = "#808080";

		document.getElementById("D7S_2a").style.visibility = "visible";
		document.getElementById("D7S_2a").style.fill = "#141414";
		document.getElementById("D7S_2b").style.visibility = "visible";
		document.getElementById("D7S_2b").style.fill = "#141414";
		document.getElementById("D7S_2c").style.visibility = "visible";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.visibility = "visible";
		document.getElementById("D7S_2d").style.fill = "#141414";
		document.getElementById("D7S_2e").style.visibility = "visible";
		document.getElementById("D7S_2e").style.fill = "#141414";
		document.getElementById("D7S_2f").style.visibility = "visible";
		document.getElementById("D7S_2f").style.fill = "#141414";
		document.getElementById("D7S_2g").style.visibility = "visible";
		document.getElementById("D7S_2g").style.fill = "#808080";

		document.getElementById("D7S_3a").style.visibility = "visible";
		document.getElementById("D7S_3a").style.fill = "#141414";
		document.getElementById("D7S_3b").style.visibility = "visible";
		document.getElementById("D7S_3b").style.fill = "#141414";
		document.getElementById("D7S_3c").style.visibility = "visible";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.visibility = "visible";
		document.getElementById("D7S_3d").style.fill = "#141414";
		document.getElementById("D7S_3e").style.visibility = "visible";
		document.getElementById("D7S_3e").style.fill = "#141414";
		document.getElementById("D7S_3f").style.visibility = "visible";
		document.getElementById("D7S_3f").style.fill = "#141414";
		document.getElementById("D7S_3g").style.visibility = "visible";
		document.getElementById("D7S_3g").style.fill = "#808080";

		document.getElementById("D7S_4a").style.visibility = "hidden";
		document.getElementById("D7S_4b").style.visibility = "visible";
		document.getElementById("D7S_4b").style.fill = "#808080";
		document.getElementById("D7S_4c").style.visibility = "visible";
		document.getElementById("D7S_4c").style.fill = "#808080";
		document.getElementById("D7S_4d").style.visibility = "hidden";
		document.getElementById("D7S_4e").style.visibility = "hidden";
		document.getElementById("D7S_4f").style.visibility = "hidden";
		document.getElementById("D7S_4g").style.visibility = "hidden";
		document.getElementById("signo").style.visibility = "visible";
		document.getElementById("signo").style.fill = "#808080";
		document.getElementById("punto1").style.visibility = "visible";
		document.getElementById("punto1").style.fill = "#808080";
		document.getElementById("punto2").style.visibility = "visible";
		document.getElementById("punto2").style.fill = "#808080";
		document.getElementById("punto3").style.visibility = "visible";
		document.getElementById("punto3").style.fill = "#808080";
		document.getElementById("punto4").style.visibility = "visible";
		document.getElementById("punto4").style.fill = "#808080";
		document.getElementById("ohmios").style.visibility = "visible";
		document.getElementById("ohmios").style.color = "#808080";
		document.getElementById("kiloohmios").style.visibility = "visible";
		document.getElementById("kiloohmios").style.color = "#808080";
		document.getElementById("megaohmios").style.visibility = "visible";
		document.getElementById("megaohmios").style.color = "#808080";
		document.getElementById("voltios").style.visibility = "visible";
		document.getElementById("voltios").style.color = "#808080";
		document.getElementById("milivoltios").style.visibility = "visible";
		document.getElementById("milivoltios").style.color = "#808080";
		document.getElementById("hfe").style.visibility = "visible";
		document.getElementById("hfe").style.color = "#141414";
		document.getElementById("miliamperios").style.visibility = "visible";
		document.getElementById("miliamperios").style.color = "#808080";
		document.getElementById("microamperios").style.visibility = "visible";
		document.getElementById("microamperios").style.color = "#808080";
		document.getElementById("AC").style.visibility = "visible";
		document.getElementById("AC").style.color = "#808080";
		
		break;
	
	case 11: //console.log("AAC - 2mA");
		document.getElementById("D7S_1a").style.visibility = "visible";
		document.getElementById("D7S_1a").style.fill = "#141414";
		document.getElementById("D7S_1b").style.visibility = "visible";
		document.getElementById("D7S_1b").style.fill = "#141414";
		document.getElementById("D7S_1c").style.visibility = "visible";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.visibility = "visible";
		document.getElementById("D7S_1d").style.fill = "#141414";
		document.getElementById("D7S_1e").style.visibility = "visible";
		document.getElementById("D7S_1e").style.fill = "#141414";
		document.getElementById("D7S_1f").style.visibility = "visible";
		document.getElementById("D7S_1f").style.fill = "#141414";
		document.getElementById("D7S_1g").style.visibility = "visible";
		document.getElementById("D7S_1g").style.fill = "#808080";

		document.getElementById("D7S_2a").style.visibility = "visible";
		document.getElementById("D7S_2a").style.fill = "#141414";
		document.getElementById("D7S_2b").style.visibility = "visible";
		document.getElementById("D7S_2b").style.fill = "#141414";
		document.getElementById("D7S_2c").style.visibility = "visible";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.visibility = "visible";
		document.getElementById("D7S_2d").style.fill = "#141414";
		document.getElementById("D7S_2e").style.visibility = "visible";
		document.getElementById("D7S_2e").style.fill = "#141414";
		document.getElementById("D7S_2f").style.visibility = "visible";
		document.getElementById("D7S_2f").style.fill = "#141414";
		document.getElementById("D7S_2g").style.visibility = "visible";
		document.getElementById("D7S_2g").style.fill = "#808080";

		document.getElementById("D7S_3a").style.visibility = "visible";
		document.getElementById("D7S_3a").style.fill = "#141414";
		document.getElementById("D7S_3b").style.visibility = "visible";
		document.getElementById("D7S_3b").style.fill = "#141414";
		document.getElementById("D7S_3c").style.visibility = "visible";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.visibility = "visible";
		document.getElementById("D7S_3d").style.fill = "#141414";
		document.getElementById("D7S_3e").style.visibility = "visible";
		document.getElementById("D7S_3e").style.fill = "#141414";
		document.getElementById("D7S_3f").style.visibility = "visible";
		document.getElementById("D7S_3f").style.fill = "#141414";
		document.getElementById("D7S_3g").style.visibility = "visible";
		document.getElementById("D7S_3g").style.fill = "#808080";

		document.getElementById("D7S_4a").style.visibility = "hidden";
		document.getElementById("D7S_4b").style.visibility = "visible";
		document.getElementById("D7S_4b").style.fill = "#808080";
		document.getElementById("D7S_4c").style.visibility = "visible";
		document.getElementById("D7S_4c").style.fill = "#808080";
		document.getElementById("D7S_4d").style.visibility = "hidden";
		document.getElementById("D7S_4e").style.visibility = "hidden";
		document.getElementById("D7S_4f").style.visibility = "hidden";
		document.getElementById("D7S_4g").style.visibility = "hidden";
		document.getElementById("signo").style.visibility = "visible";
		document.getElementById("signo").style.fill = "#808080";
		document.getElementById("punto1").style.visibility = "visible";
		document.getElementById("punto1").style.fill = "#141414";
		document.getElementById("punto2").style.visibility = "visible";
		document.getElementById("punto2").style.fill = "#808080";
		document.getElementById("punto3").style.visibility = "visible";
		document.getElementById("punto3").style.fill = "#808080";
		document.getElementById("punto4").style.visibility = "visible";
		document.getElementById("punto4").style.fill = "#808080";
		document.getElementById("ohmios").style.visibility = "visible";
		document.getElementById("ohmios").style.color = "#808080";
		document.getElementById("kiloohmios").style.visibility = "visible";
		document.getElementById("kiloohmios").style.color = "#808080";
		document.getElementById("megaohmios").style.visibility = "visible";
		document.getElementById("megaohmios").style.color = "#808080";
		document.getElementById("voltios").style.visibility = "visible";
		document.getElementById("voltios").style.color = "#808080";
		document.getElementById("milivoltios").style.visibility = "visible";
		document.getElementById("milivoltios").style.color = "#808080";
		document.getElementById("hfe").style.visibility = "visible";
		document.getElementById("hfe").style.color = "#808080";
		document.getElementById("miliamperios").style.visibility = "visible";
		document.getElementById("miliamperios").style.color = "#141414";
		document.getElementById("microamperios").style.visibility = "visible";
		document.getElementById("microamperios").style.color = "#808080";
		document.getElementById("AC").style.visibility = "visible";
		document.getElementById("AC").style.color = "#141414";
		
		magnitudAMedir = "A";
		tipoMagnitudAMedir = "AC";
		valorMaximo = .00199;
		valorMinimo = -.001999;

		break;

	case 12: //console.log("AAC - 20mA/10A");
		document.getElementById("D7S_1a").style.visibility = "visible";
		document.getElementById("D7S_1a").style.fill = "#141414";
		document.getElementById("D7S_1b").style.visibility = "visible";
		document.getElementById("D7S_1b").style.fill = "#141414";
		document.getElementById("D7S_1c").style.visibility = "visible";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.visibility = "visible";
		document.getElementById("D7S_1d").style.fill = "#141414";
		document.getElementById("D7S_1e").style.visibility = "visible";
		document.getElementById("D7S_1e").style.fill = "#141414";
		document.getElementById("D7S_1f").style.visibility = "visible";
		document.getElementById("D7S_1f").style.fill = "#141414";
		document.getElementById("D7S_1g").style.visibility = "visible";
		document.getElementById("D7S_1g").style.fill = "#808080";

		document.getElementById("D7S_2a").style.visibility = "visible";
		document.getElementById("D7S_2a").style.fill = "#141414";
		document.getElementById("D7S_2b").style.visibility = "visible";
		document.getElementById("D7S_2b").style.fill = "#141414";
		document.getElementById("D7S_2c").style.visibility = "visible";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.visibility = "visible";
		document.getElementById("D7S_2d").style.fill = "#141414";
		document.getElementById("D7S_2e").style.visibility = "visible";
		document.getElementById("D7S_2e").style.fill = "#141414";
		document.getElementById("D7S_2f").style.visibility = "visible";
		document.getElementById("D7S_2f").style.fill = "#141414";
		document.getElementById("D7S_2g").style.visibility = "visible";
		document.getElementById("D7S_2g").style.fill = "#808080";

		document.getElementById("D7S_3a").style.visibility = "visible";
		document.getElementById("D7S_3a").style.fill = "#141414";
		document.getElementById("D7S_3b").style.visibility = "visible";
		document.getElementById("D7S_3b").style.fill = "#141414";
		document.getElementById("D7S_3c").style.visibility = "visible";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.visibility = "visible";
		document.getElementById("D7S_3d").style.fill = "#141414";
		document.getElementById("D7S_3e").style.visibility = "visible";
		document.getElementById("D7S_3e").style.fill = "#141414";
		document.getElementById("D7S_3f").style.visibility = "visible";
		document.getElementById("D7S_3f").style.fill = "#141414";
		document.getElementById("D7S_3g").style.visibility = "visible";
		document.getElementById("D7S_3g").style.fill = "#808080";

		document.getElementById("D7S_4a").style.visibility = "hidden";
		document.getElementById("D7S_4b").style.visibility = "visible";
		document.getElementById("D7S_4b").style.fill = "#808080";
		document.getElementById("D7S_4c").style.visibility = "visible";
		document.getElementById("D7S_4c").style.fill = "#808080";
		document.getElementById("D7S_4d").style.visibility = "hidden";
		document.getElementById("D7S_4e").style.visibility = "hidden";
		document.getElementById("D7S_4f").style.visibility = "hidden";
		document.getElementById("D7S_4g").style.visibility = "hidden";
		document.getElementById("signo").style.visibility = "visible";
		document.getElementById("signo").style.fill = "#808080";
		document.getElementById("punto1").style.visibility = "visible";
		document.getElementById("punto1").style.fill = "#808080";
		document.getElementById("punto2").style.visibility = "visible";
		document.getElementById("punto2").style.fill = "#141414";
		document.getElementById("punto3").style.visibility = "visible";
		document.getElementById("punto3").style.fill = "#808080";
		document.getElementById("punto4").style.visibility = "visible";
		document.getElementById("punto4").style.fill = "#808080";
		document.getElementById("ohmios").style.visibility = "visible";
		document.getElementById("ohmios").style.color = "#808080";
		document.getElementById("kiloohmios").style.visibility = "visible";
		document.getElementById("kiloohmios").style.color = "#808080";
		document.getElementById("megaohmios").style.visibility = "visible";
		document.getElementById("megaohmios").style.color = "#808080";
		document.getElementById("voltios").style.visibility = "visible";
		document.getElementById("voltios").style.color = "#808080";
		document.getElementById("milivoltios").style.visibility = "visible";
		document.getElementById("milivoltios").style.color = "#808080";
		document.getElementById("hfe").style.visibility = "visible";
		document.getElementById("hfe").style.color = "#808080";
		document.getElementById("miliamperios").style.visibility = "visible";
		document.getElementById("miliamperios").style.color = "#808080";
		document.getElementById("microamperios").style.visibility = "visible";
		document.getElementById("microamperios").style.color = "#808080";
		document.getElementById("AC").style.visibility = "visible";
		document.getElementById("AC").style.color = "#141414";
		
		magnitudAMedir = "A";
		tipoMagnitudAMedir = "AC";
		valorMaximo = .0199;
		valorMinimo = -.01999;

		break;

	case 13: //console.log("AAC - 200mA");
		document.getElementById("D7S_1a").style.visibility = "visible";
		document.getElementById("D7S_1a").style.fill = "#141414";
		document.getElementById("D7S_1b").style.visibility = "visible";
		document.getElementById("D7S_1b").style.fill = "#141414";
		document.getElementById("D7S_1c").style.visibility = "visible";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.visibility = "visible";
		document.getElementById("D7S_1d").style.fill = "#141414";
		document.getElementById("D7S_1e").style.visibility = "visible";
		document.getElementById("D7S_1e").style.fill = "#141414";
		document.getElementById("D7S_1f").style.visibility = "visible";
		document.getElementById("D7S_1f").style.fill = "#141414";
		document.getElementById("D7S_1g").style.visibility = "visible";
		document.getElementById("D7S_1g").style.fill = "#808080";

		document.getElementById("D7S_2a").style.visibility = "visible";
		document.getElementById("D7S_2a").style.fill = "#141414";
		document.getElementById("D7S_2b").style.visibility = "visible";
		document.getElementById("D7S_2b").style.fill = "#141414";
		document.getElementById("D7S_2c").style.visibility = "visible";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.visibility = "visible";
		document.getElementById("D7S_2d").style.fill = "#141414";
		document.getElementById("D7S_2e").style.visibility = "visible";
		document.getElementById("D7S_2e").style.fill = "#141414";
		document.getElementById("D7S_2f").style.visibility = "visible";
		document.getElementById("D7S_2f").style.fill = "#141414";
		document.getElementById("D7S_2g").style.visibility = "visible";
		document.getElementById("D7S_2g").style.fill = "#808080";

		document.getElementById("D7S_3a").style.visibility = "visible";
		document.getElementById("D7S_3a").style.fill = "#141414";
		document.getElementById("D7S_3b").style.visibility = "visible";
		document.getElementById("D7S_3b").style.fill = "#141414";
		document.getElementById("D7S_3c").style.visibility = "visible";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.visibility = "visible";
		document.getElementById("D7S_3d").style.fill = "#141414";
		document.getElementById("D7S_3e").style.visibility = "visible";
		document.getElementById("D7S_3e").style.fill = "#141414";
		document.getElementById("D7S_3f").style.visibility = "visible";
		document.getElementById("D7S_3f").style.fill = "#141414";
		document.getElementById("D7S_3g").style.visibility = "visible";
		document.getElementById("D7S_3g").style.fill = "#808080";

		document.getElementById("D7S_4a").style.visibility = "hidden";
		document.getElementById("D7S_4b").style.visibility = "visible";
		document.getElementById("D7S_4b").style.fill = "#808080";
		document.getElementById("D7S_4c").style.visibility = "visible";
		document.getElementById("D7S_4c").style.fill = "#808080";
		document.getElementById("D7S_4d").style.visibility = "hidden";
		document.getElementById("D7S_4e").style.visibility = "hidden";
		document.getElementById("D7S_4f").style.visibility = "hidden";
		document.getElementById("D7S_4g").style.visibility = "hidden";
		document.getElementById("signo").style.visibility = "visible";
		document.getElementById("signo").style.fill = "#808080";
		document.getElementById("punto1").style.visibility = "visible";
		document.getElementById("punto1").style.fill = "#808080";
		document.getElementById("punto2").style.visibility = "visible";
		document.getElementById("punto2").style.fill = "#808080";
		document.getElementById("punto3").style.visibility = "visible";
		document.getElementById("punto3").style.fill = "#141414";
		document.getElementById("punto4").style.visibility = "visible";
		document.getElementById("punto4").style.fill = "#808080";
		document.getElementById("ohmios").style.visibility = "visible";
		document.getElementById("ohmios").style.color = "#808080";
		document.getElementById("kiloohmios").style.visibility = "visible";
		document.getElementById("kiloohmios").style.color = "#808080";
		document.getElementById("megaohmios").style.visibility = "visible";
		document.getElementById("megaohmios").style.color = "#808080";
		document.getElementById("voltios").style.visibility = "visible";
		document.getElementById("voltios").style.color = "#808080";
		document.getElementById("milivoltios").style.visibility = "visible";
		document.getElementById("milivoltios").style.color = "#808080";
		document.getElementById("hfe").style.visibility = "visible";
		document.getElementById("hfe").style.color = "#808080";
		document.getElementById("miliamperios").style.visibility = "visible";
		document.getElementById("miliamperios").style.color = "#141414";
		document.getElementById("microamperios").style.visibility = "visible";
		document.getElementById("microamperios").style.color = "#808080";
		document.getElementById("AC").style.visibility = "visible";
		document.getElementById("AC").style.color = "#141414";
		
		magnitudAMedir = "A";
		tipoMagnitudAMedir = "AC";
		valorMaximo = .199;
		valorMinimo = -.1999;
		
		break;

	case 14: //console.log("ADC - 200mA");
		document.getElementById("D7S_1a").style.visibility = "visible";
		document.getElementById("D7S_1a").style.fill = "#141414";
		document.getElementById("D7S_1b").style.visibility = "visible";
		document.getElementById("D7S_1b").style.fill = "#141414";
		document.getElementById("D7S_1c").style.visibility = "visible";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.visibility = "visible";
		document.getElementById("D7S_1d").style.fill = "#141414";
		document.getElementById("D7S_1e").style.visibility = "visible";
		document.getElementById("D7S_1e").style.fill = "#141414";
		document.getElementById("D7S_1f").style.visibility = "visible";
		document.getElementById("D7S_1f").style.fill = "#141414";
		document.getElementById("D7S_1g").style.visibility = "visible";
		document.getElementById("D7S_1g").style.fill = "#808080";

		document.getElementById("D7S_2a").style.visibility = "visible";
		document.getElementById("D7S_2a").style.fill = "#141414";
		document.getElementById("D7S_2b").style.visibility = "visible";
		document.getElementById("D7S_2b").style.fill = "#141414";
		document.getElementById("D7S_2c").style.visibility = "visible";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.visibility = "visible";
		document.getElementById("D7S_2d").style.fill = "#141414";
		document.getElementById("D7S_2e").style.visibility = "visible";
		document.getElementById("D7S_2e").style.fill = "#141414";
		document.getElementById("D7S_2f").style.visibility = "visible";
		document.getElementById("D7S_2f").style.fill = "#141414";
		document.getElementById("D7S_2g").style.visibility = "visible";
		document.getElementById("D7S_2g").style.fill = "#808080";

		document.getElementById("D7S_3a").style.visibility = "visible";
		document.getElementById("D7S_3a").style.fill = "#141414";
		document.getElementById("D7S_3b").style.visibility = "visible";
		document.getElementById("D7S_3b").style.fill = "#141414";
		document.getElementById("D7S_3c").style.visibility = "visible";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.visibility = "visible";
		document.getElementById("D7S_3d").style.fill = "#141414";
		document.getElementById("D7S_3e").style.visibility = "visible";
		document.getElementById("D7S_3e").style.fill = "#141414";
		document.getElementById("D7S_3f").style.visibility = "visible";
		document.getElementById("D7S_3f").style.fill = "#141414";
		document.getElementById("D7S_3g").style.visibility = "visible";
		document.getElementById("D7S_3g").style.fill = "#808080";

		document.getElementById("D7S_4a").style.visibility = "hidden";
		document.getElementById("D7S_4b").style.visibility = "visible";
		document.getElementById("D7S_4b").style.fill = "#808080";
		document.getElementById("D7S_4c").style.visibility = "visible";
		document.getElementById("D7S_4c").style.fill = "#808080";
		document.getElementById("D7S_4d").style.visibility = "hidden";
		document.getElementById("D7S_4e").style.visibility = "hidden";
		document.getElementById("D7S_4f").style.visibility = "hidden";
		document.getElementById("D7S_4g").style.visibility = "hidden";
		document.getElementById("signo").style.visibility = "visible";
		document.getElementById("signo").style.fill = "#808080";
		document.getElementById("punto1").style.visibility = "visible";
		document.getElementById("punto1").style.fill = "#808080";
		document.getElementById("punto2").style.visibility = "visible";
		document.getElementById("punto2").style.fill = "#808080";
		document.getElementById("punto3").style.visibility = "visible";
		document.getElementById("punto3").style.fill = "#141414";
		document.getElementById("punto4").style.visibility = "visible";
		document.getElementById("punto4").style.fill = "#808080";
		document.getElementById("ohmios").style.visibility = "visible";
		document.getElementById("ohmios").style.color = "#808080";
		document.getElementById("kiloohmios").style.visibility = "visible";
		document.getElementById("kiloohmios").style.color = "#808080";
		document.getElementById("megaohmios").style.visibility = "visible";
		document.getElementById("megaohmios").style.color = "#808080";
		document.getElementById("voltios").style.visibility = "visible";
		document.getElementById("voltios").style.color = "#808080";
		document.getElementById("milivoltios").style.visibility = "visible";
		document.getElementById("milivoltios").style.color = "#808080";
		document.getElementById("hfe").style.visibility = "visible";
		document.getElementById("hfe").style.color = "#808080";
		document.getElementById("miliamperios").style.visibility = "visible";
		document.getElementById("miliamperios").style.color = "#141414";
		document.getElementById("microamperios").style.visibility = "visible";
		document.getElementById("microamperios").style.color = "#808080";
		document.getElementById("AC").style.visibility = "visible";
		document.getElementById("AC").style.color = "#808080";
		
		magnitudAMedir = "A";
		tipoMagnitudAMedir = "DC";
		valorMaximo = .1999;
		valorMinimo = -.1999;

		break;

	case 15: //console.log("ADC - 20mA/10A");
		document.getElementById("D7S_1a").style.visibility = "visible";
		document.getElementById("D7S_1a").style.fill = "#141414";
		document.getElementById("D7S_1b").style.visibility = "visible";
		document.getElementById("D7S_1b").style.fill = "#141414";
		document.getElementById("D7S_1c").style.visibility = "visible";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.visibility = "visible";
		document.getElementById("D7S_1d").style.fill = "#141414";
		document.getElementById("D7S_1e").style.visibility = "visible";
		document.getElementById("D7S_1e").style.fill = "#141414";
		document.getElementById("D7S_1f").style.visibility = "visible";
		document.getElementById("D7S_1f").style.fill = "#141414";
		document.getElementById("D7S_1g").style.visibility = "visible";
		document.getElementById("D7S_1g").style.fill = "#808080";

		document.getElementById("D7S_2a").style.visibility = "visible";
		document.getElementById("D7S_2a").style.fill = "#141414";
		document.getElementById("D7S_2b").style.visibility = "visible";
		document.getElementById("D7S_2b").style.fill = "#141414";
		document.getElementById("D7S_2c").style.visibility = "visible";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.visibility = "visible";
		document.getElementById("D7S_2d").style.fill = "#141414";
		document.getElementById("D7S_2e").style.visibility = "visible";
		document.getElementById("D7S_2e").style.fill = "#141414";
		document.getElementById("D7S_2f").style.visibility = "visible";
		document.getElementById("D7S_2f").style.fill = "#141414";
		document.getElementById("D7S_2g").style.visibility = "visible";
		document.getElementById("D7S_2g").style.fill = "#808080";

		document.getElementById("D7S_3a").style.visibility = "visible";
		document.getElementById("D7S_3a").style.fill = "#141414";
		document.getElementById("D7S_3b").style.visibility = "visible";
		document.getElementById("D7S_3b").style.fill = "#141414";
		document.getElementById("D7S_3c").style.visibility = "visible";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.visibility = "visible";
		document.getElementById("D7S_3d").style.fill = "#141414";
		document.getElementById("D7S_3e").style.visibility = "visible";
		document.getElementById("D7S_3e").style.fill = "#141414";
		document.getElementById("D7S_3f").style.visibility = "visible";
		document.getElementById("D7S_3f").style.fill = "#141414";
		document.getElementById("D7S_3g").style.visibility = "visible";
		document.getElementById("D7S_3g").style.fill = "#808080";

		document.getElementById("D7S_4a").style.visibility = "hidden";
		document.getElementById("D7S_4b").style.visibility = "visible";
		document.getElementById("D7S_4b").style.fill = "#808080";
		document.getElementById("D7S_4c").style.visibility = "visible";
		document.getElementById("D7S_4c").style.fill = "#808080";
		document.getElementById("D7S_4d").style.visibility = "hidden";
		document.getElementById("D7S_4e").style.visibility = "hidden";
		document.getElementById("D7S_4f").style.visibility = "hidden";
		document.getElementById("D7S_4g").style.visibility = "hidden";
		document.getElementById("signo").style.visibility = "visible";
		document.getElementById("signo").style.fill = "#808080";
		document.getElementById("punto1").style.visibility = "visible";
		document.getElementById("punto1").style.fill = "#808080";
		document.getElementById("punto2").style.visibility = "visible";
		document.getElementById("punto2").style.fill = "#141414";
		document.getElementById("punto3").style.visibility = "visible";
		document.getElementById("punto3").style.fill = "#808080";
		document.getElementById("punto4").style.visibility = "visible";
		document.getElementById("punto4").style.fill = "#808080";
		document.getElementById("ohmios").style.visibility = "visible";
		document.getElementById("ohmios").style.color = "#808080";
		document.getElementById("kiloohmios").style.visibility = "visible";
		document.getElementById("kiloohmios").style.color = "#808080";
		document.getElementById("megaohmios").style.visibility = "visible";
		document.getElementById("megaohmios").style.color = "#808080";
		document.getElementById("voltios").style.visibility = "visible";
		document.getElementById("voltios").style.color = "#808080";
		document.getElementById("milivoltios").style.visibility = "visible";
		document.getElementById("milivoltios").style.color = "#808080";
		document.getElementById("hfe").style.visibility = "visible";
		document.getElementById("hfe").style.color = "#808080";
		document.getElementById("miliamperios").style.visibility = "visible";
		document.getElementById("miliamperios").style.color = "#808080";
		document.getElementById("microamperios").style.visibility = "visible";
		document.getElementById("microamperios").style.color = "#808080";
		document.getElementById("AC").style.visibility = "visible";
		document.getElementById("AC").style.color = "#808080";
		
		magnitudAMedir = "A";
		tipoMagnitudAMedir = "DC";
		valorMaximo = .01999;
		valorMinimo = -.01999;

		break;

	case 16: //console.log("ADC - 2mA");
		document.getElementById("D7S_1a").style.visibility = "visible";
		document.getElementById("D7S_1a").style.fill = "#141414";
		document.getElementById("D7S_1b").style.visibility = "visible";
		document.getElementById("D7S_1b").style.fill = "#141414";
		document.getElementById("D7S_1c").style.visibility = "visible";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.visibility = "visible";
		document.getElementById("D7S_1d").style.fill = "#141414";
		document.getElementById("D7S_1e").style.visibility = "visible";
		document.getElementById("D7S_1e").style.fill = "#141414";
		document.getElementById("D7S_1f").style.visibility = "visible";
		document.getElementById("D7S_1f").style.fill = "#141414";
		document.getElementById("D7S_1g").style.visibility = "visible";
		document.getElementById("D7S_1g").style.fill = "#808080";

		document.getElementById("D7S_2a").style.visibility = "visible";
		document.getElementById("D7S_2a").style.fill = "#141414";
		document.getElementById("D7S_2b").style.visibility = "visible";
		document.getElementById("D7S_2b").style.fill = "#141414";
		document.getElementById("D7S_2c").style.visibility = "visible";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.visibility = "visible";
		document.getElementById("D7S_2d").style.fill = "#141414";
		document.getElementById("D7S_2e").style.visibility = "visible";
		document.getElementById("D7S_2e").style.fill = "#141414";
		document.getElementById("D7S_2f").style.visibility = "visible";
		document.getElementById("D7S_2f").style.fill = "#141414";
		document.getElementById("D7S_2g").style.visibility = "visible";
		document.getElementById("D7S_2g").style.fill = "#808080";

		document.getElementById("D7S_3a").style.visibility = "visible";
		document.getElementById("D7S_3a").style.fill = "#141414";
		document.getElementById("D7S_3b").style.visibility = "visible";
		document.getElementById("D7S_3b").style.fill = "#141414";
		document.getElementById("D7S_3c").style.visibility = "visible";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.visibility = "visible";
		document.getElementById("D7S_3d").style.fill = "#141414";
		document.getElementById("D7S_3e").style.visibility = "visible";
		document.getElementById("D7S_3e").style.fill = "#141414";
		document.getElementById("D7S_3f").style.visibility = "visible";
		document.getElementById("D7S_3f").style.fill = "#141414";
		document.getElementById("D7S_3g").style.visibility = "visible";
		document.getElementById("D7S_3g").style.fill = "#808080";

		document.getElementById("D7S_4a").style.visibility = "hidden";
		document.getElementById("D7S_4b").style.visibility = "visible";
		document.getElementById("D7S_4b").style.fill = "#808080";
		document.getElementById("D7S_4c").style.visibility = "visible";
		document.getElementById("D7S_4c").style.fill = "#808080";
		document.getElementById("D7S_4d").style.visibility = "hidden";
		document.getElementById("D7S_4e").style.visibility = "hidden";
		document.getElementById("D7S_4f").style.visibility = "hidden";
		document.getElementById("D7S_4g").style.visibility = "hidden";
		document.getElementById("signo").style.visibility = "visible";
		document.getElementById("signo").style.fill = "#808080";
		document.getElementById("punto1").style.visibility = "visible";
		document.getElementById("punto1").style.fill = "#141414";
		document.getElementById("punto2").style.visibility = "visible";
		document.getElementById("punto2").style.fill = "#808080";
		document.getElementById("punto3").style.visibility = "visible";
		document.getElementById("punto3").style.fill = "#808080";
		document.getElementById("punto4").style.visibility = "visible";
		document.getElementById("punto4").style.fill = "#808080";
		document.getElementById("ohmios").style.visibility = "visible";
		document.getElementById("ohmios").style.color = "#808080";
		document.getElementById("kiloohmios").style.visibility = "visible";
		document.getElementById("kiloohmios").style.color = "#808080";
		document.getElementById("megaohmios").style.visibility = "visible";
		document.getElementById("megaohmios").style.color = "#808080";
		document.getElementById("voltios").style.visibility = "visible";
		document.getElementById("voltios").style.color = "#808080";
		document.getElementById("milivoltios").style.visibility = "visible";
		document.getElementById("milivoltios").style.color = "#808080";
		document.getElementById("hfe").style.visibility = "visible";
		document.getElementById("hfe").style.color = "#808080";
		document.getElementById("miliamperios").style.visibility = "visible";
		document.getElementById("miliamperios").style.color = "#141414";
		document.getElementById("microamperios").style.visibility = "visible";
		document.getElementById("microamperios").style.color = "#808080";
		document.getElementById("AC").style.visibility = "visible";
		document.getElementById("AC").style.color = "#808080";
		
		magnitudAMedir = "A";
		tipoMagnitudAMedir = "DC";
		valorMaximo = .00199;
		valorMinimo = -.001999;

		break;

	case 17: //console.log("ADC - 200uA");
		document.getElementById("D7S_1a").style.visibility = "visible";
		document.getElementById("D7S_1a").style.fill = "#141414";
		document.getElementById("D7S_1b").style.visibility = "visible";
		document.getElementById("D7S_1b").style.fill = "#141414";
		document.getElementById("D7S_1c").style.visibility = "visible";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.visibility = "visible";
		document.getElementById("D7S_1d").style.fill = "#141414";
		document.getElementById("D7S_1e").style.visibility = "visible";
		document.getElementById("D7S_1e").style.fill = "#141414";
		document.getElementById("D7S_1f").style.visibility = "visible";
		document.getElementById("D7S_1f").style.fill = "#141414";
		document.getElementById("D7S_1g").style.visibility = "visible";
		document.getElementById("D7S_1g").style.fill = "#808080";

		document.getElementById("D7S_2a").style.visibility = "visible";
		document.getElementById("D7S_2a").style.fill = "#141414";
		document.getElementById("D7S_2b").style.visibility = "visible";
		document.getElementById("D7S_2b").style.fill = "#141414";
		document.getElementById("D7S_2c").style.visibility = "visible";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.visibility = "visible";
		document.getElementById("D7S_2d").style.fill = "#141414";
		document.getElementById("D7S_2e").style.visibility = "visible";
		document.getElementById("D7S_2e").style.fill = "#141414";
		document.getElementById("D7S_2f").style.visibility = "visible";
		document.getElementById("D7S_2f").style.fill = "#141414";
		document.getElementById("D7S_2g").style.visibility = "visible";
		document.getElementById("D7S_2g").style.fill = "#808080";

		document.getElementById("D7S_3a").style.visibility = "visible";
		document.getElementById("D7S_3a").style.fill = "#141414";
		document.getElementById("D7S_3b").style.visibility = "visible";
		document.getElementById("D7S_3b").style.fill = "#141414";
		document.getElementById("D7S_3c").style.visibility = "visible";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.visibility = "visible";
		document.getElementById("D7S_3d").style.fill = "#141414";
		document.getElementById("D7S_3e").style.visibility = "visible";
		document.getElementById("D7S_3e").style.fill = "#141414";
		document.getElementById("D7S_3f").style.visibility = "visible";
		document.getElementById("D7S_3f").style.fill = "#141414";
		document.getElementById("D7S_3g").style.visibility = "visible";
		document.getElementById("D7S_3g").style.fill = "#808080";

		document.getElementById("D7S_4a").style.visibility = "hidden";
		document.getElementById("D7S_4b").style.visibility = "visible";
		document.getElementById("D7S_4b").style.fill = "#808080";
		document.getElementById("D7S_4c").style.visibility = "visible";
		document.getElementById("D7S_4c").style.fill = "#808080";
		document.getElementById("D7S_4d").style.visibility = "hidden";
		document.getElementById("D7S_4e").style.visibility = "hidden";
		document.getElementById("D7S_4f").style.visibility = "hidden";
		document.getElementById("D7S_4g").style.visibility = "hidden";
		document.getElementById("signo").style.visibility = "visible";
		document.getElementById("signo").style.fill = "#808080";
		document.getElementById("punto1").style.visibility = "visible";
		document.getElementById("punto1").style.fill = "#808080";
		document.getElementById("punto2").style.visibility = "visible";
		document.getElementById("punto2").style.fill = "#808080";
		document.getElementById("punto3").style.visibility = "visible";
		document.getElementById("punto3").style.fill = "#141414";
		document.getElementById("punto4").style.visibility = "visible";
		document.getElementById("punto4").style.fill = "#808080";
		document.getElementById("ohmios").style.visibility = "visible";
		document.getElementById("ohmios").style.color = "#808080";
		document.getElementById("kiloohmios").style.visibility = "visible";
		document.getElementById("kiloohmios").style.color = "#808080";
		document.getElementById("megaohmios").style.visibility = "visible";
		document.getElementById("megaohmios").style.color = "#808080";
		document.getElementById("voltios").style.visibility = "visible";
		document.getElementById("voltios").style.color = "#808080";
		document.getElementById("milivoltios").style.visibility = "visible";
		document.getElementById("milivoltios").style.color = "#808080";
		document.getElementById("hfe").style.visibility = "visible";
		document.getElementById("hfe").style.color = "#808080";
		document.getElementById("miliamperios").style.visibility = "visible";
		document.getElementById("miliamperios").style.color = "#808080";
		document.getElementById("microamperios").style.visibility = "visible";
		document.getElementById("microamperios").style.color = "#141414";
		document.getElementById("AC").style.visibility = "visible";
		document.getElementById("AC").style.color = "#808080";
		
		magnitudAMedir = "A";
		tipoMagnitudAMedir = "DC";
		valorMaximo = .000199;
		valorMinimo = -.0001999;
		
		break;
	
	case 18: //console.log("Ohm - 200");
		document.getElementById("D7S_1a").style.visibility = "visible";
		document.getElementById("D7S_1a").style.fill = "#808080";
		document.getElementById("D7S_1b").style.visibility = "visible";
		document.getElementById("D7S_1b").style.fill = "#808080";
		document.getElementById("D7S_1c").style.visibility = "visible";
		document.getElementById("D7S_1c").style.fill = "#808080";
		document.getElementById("D7S_1d").style.visibility = "visible";
		document.getElementById("D7S_1d").style.fill = "#808080";
		document.getElementById("D7S_1e").style.visibility = "visible";
		document.getElementById("D7S_1e").style.fill = "#808080";
		document.getElementById("D7S_1f").style.visibility = "visible";
		document.getElementById("D7S_1f").style.fill = "#808080";
		document.getElementById("D7S_1g").style.visibility = "visible";
		document.getElementById("D7S_1g").style.fill = "#808080";

		document.getElementById("D7S_2a").style.visibility = "visible";
		document.getElementById("D7S_2a").style.fill = "#808080";
		document.getElementById("D7S_2b").style.visibility = "visible";
		document.getElementById("D7S_2b").style.fill = "#808080";
		document.getElementById("D7S_2c").style.visibility = "visible";
		document.getElementById("D7S_2c").style.fill = "#808080";
		document.getElementById("D7S_2d").style.visibility = "visible";
		document.getElementById("D7S_2d").style.fill = "#808080";
		document.getElementById("D7S_2e").style.visibility = "visible";
		document.getElementById("D7S_2e").style.fill = "#808080";
		document.getElementById("D7S_2f").style.visibility = "visible";
		document.getElementById("D7S_2f").style.fill = "#808080";
		document.getElementById("D7S_2g").style.visibility = "visible";
		document.getElementById("D7S_2g").style.fill = "#808080";

		document.getElementById("D7S_3a").style.visibility = "visible";
		document.getElementById("D7S_3a").style.fill = "#808080";
		document.getElementById("D7S_3b").style.visibility = "visible";
		document.getElementById("D7S_3b").style.fill = "#808080";
		document.getElementById("D7S_3c").style.visibility = "visible";
		document.getElementById("D7S_3c").style.fill = "#808080";
		document.getElementById("D7S_3d").style.visibility = "visible";
		document.getElementById("D7S_3d").style.fill = "#808080";
		document.getElementById("D7S_3e").style.visibility = "visible";
		document.getElementById("D7S_3e").style.fill = "#808080";
		document.getElementById("D7S_3f").style.visibility = "visible";
		document.getElementById("D7S_3f").style.fill = "#808080";
		document.getElementById("D7S_3g").style.visibility = "visible";
		document.getElementById("D7S_3g").style.fill = "#808080";

		document.getElementById("D7S_4a").style.visibility = "hidden";
		document.getElementById("D7S_4b").style.visibility = "visible";
		document.getElementById("D7S_4b").style.fill = "#141414";
		document.getElementById("D7S_4c").style.visibility = "visible";
		document.getElementById("D7S_4c").style.fill = "#141414";
		document.getElementById("D7S_4d").style.visibility = "hidden";
		document.getElementById("D7S_4e").style.visibility = "hidden";
		document.getElementById("D7S_4f").style.visibility = "hidden";
		document.getElementById("D7S_4g").style.visibility = "hidden";
		document.getElementById("signo").style.visibility = "visible";
		document.getElementById("signo").style.fill = "#808080";
		document.getElementById("punto1").style.visibility = "visible";
		document.getElementById("punto1").style.fill = "#808080";
		document.getElementById("punto2").style.visibility = "visible";
		document.getElementById("punto2").style.fill = "#808080";
		document.getElementById("punto3").style.visibility = "visible";
		document.getElementById("punto3").style.fill = "#808080";
		document.getElementById("punto4").style.visibility = "visible";
		document.getElementById("punto4").style.fill = "#808080";
		document.getElementById("ohmios").style.visibility = "visible";
		document.getElementById("ohmios").style.color = "#141414";
		document.getElementById("kiloohmios").style.visibility = "visible";
		document.getElementById("kiloohmios").style.color = "#808080";
		document.getElementById("megaohmios").style.visibility = "visible";
		document.getElementById("megaohmios").style.color = "#808080";
		document.getElementById("voltios").style.visibility = "visible";
		document.getElementById("voltios").style.color = "#808080";
		document.getElementById("milivoltios").style.visibility = "visible";
		document.getElementById("milivoltios").style.color = "#808080";
		document.getElementById("hfe").style.visibility = "visible";
		document.getElementById("hfe").style.color = "#808080";
		document.getElementById("miliamperios").style.visibility = "visible";
		document.getElementById("miliamperios").style.color = "#808080";
		document.getElementById("microamperios").style.visibility = "visible";
		document.getElementById("microamperios").style.color = "#808080";
		document.getElementById("AC").style.visibility = "visible";
		document.getElementById("AC").style.color = "#808080";
		
		magnitudAMedir = "Ohm";
		tipoMagnitudAMedir = null
		valorMaximo = 200;
		valorMinimo = .0;

		break;
	
	case 19: //console.log("Ohm - 2k");
		document.getElementById("D7S_1a").style.visibility = "visible";
		document.getElementById("D7S_1a").style.fill = "#808080";
		document.getElementById("D7S_1b").style.visibility = "visible";
		document.getElementById("D7S_1b").style.fill = "#808080";
		document.getElementById("D7S_1c").style.visibility = "visible";
		document.getElementById("D7S_1c").style.fill = "#808080";
		document.getElementById("D7S_1d").style.visibility = "visible";
		document.getElementById("D7S_1d").style.fill = "#808080";
		document.getElementById("D7S_1e").style.visibility = "visible";
		document.getElementById("D7S_1e").style.fill = "#808080";
		document.getElementById("D7S_1f").style.visibility = "visible";
		document.getElementById("D7S_1f").style.fill = "#808080";
		document.getElementById("D7S_1g").style.visibility = "visible";
		document.getElementById("D7S_1g").style.fill = "#808080";

		document.getElementById("D7S_2a").style.visibility = "visible";
		document.getElementById("D7S_2a").style.fill = "#808080";
		document.getElementById("D7S_2b").style.visibility = "visible";
		document.getElementById("D7S_2b").style.fill = "#808080";
		document.getElementById("D7S_2c").style.visibility = "visible";
		document.getElementById("D7S_2c").style.fill = "#808080";
		document.getElementById("D7S_2d").style.visibility = "visible";
		document.getElementById("D7S_2d").style.fill = "#808080";
		document.getElementById("D7S_2e").style.visibility = "visible";
		document.getElementById("D7S_2e").style.fill = "#808080";
		document.getElementById("D7S_2f").style.visibility = "visible";
		document.getElementById("D7S_2f").style.fill = "#808080";
		document.getElementById("D7S_2g").style.visibility = "visible";
		document.getElementById("D7S_2g").style.fill = "#808080";

		document.getElementById("D7S_3a").style.visibility = "visible";
		document.getElementById("D7S_3a").style.fill = "#808080";
		document.getElementById("D7S_3b").style.visibility = "visible";
		document.getElementById("D7S_3b").style.fill = "#808080";
		document.getElementById("D7S_3c").style.visibility = "visible";
		document.getElementById("D7S_3c").style.fill = "#808080";
		document.getElementById("D7S_3d").style.visibility = "visible";
		document.getElementById("D7S_3d").style.fill = "#808080";
		document.getElementById("D7S_3e").style.visibility = "visible";
		document.getElementById("D7S_3e").style.fill = "#808080";
		document.getElementById("D7S_3f").style.visibility = "visible";
		document.getElementById("D7S_3f").style.fill = "#808080";
		document.getElementById("D7S_3g").style.visibility = "visible";
		document.getElementById("D7S_3g").style.fill = "#808080";

		document.getElementById("D7S_4a").style.visibility = "hidden";
		document.getElementById("D7S_4b").style.visibility = "visible";
		document.getElementById("D7S_4b").style.fill = "#141414";
		document.getElementById("D7S_4c").style.visibility = "visible";
		document.getElementById("D7S_4c").style.fill = "#141414";
		document.getElementById("D7S_4d").style.visibility = "hidden";
		document.getElementById("D7S_4e").style.visibility = "hidden";
		document.getElementById("D7S_4f").style.visibility = "hidden";
		document.getElementById("D7S_4g").style.visibility = "hidden";
		document.getElementById("signo").style.visibility = "visible";
		document.getElementById("signo").style.fill = "#808080";
		document.getElementById("punto1").style.visibility = "visible";
		document.getElementById("punto1").style.fill = "#808080";
		document.getElementById("punto2").style.visibility = "visible";
		document.getElementById("punto2").style.fill = "#808080";
		document.getElementById("punto3").style.visibility = "visible";
		document.getElementById("punto3").style.fill = "#808080";
		document.getElementById("punto4").style.visibility = "visible";
		document.getElementById("punto4").style.fill = "#808080";
		document.getElementById("ohmios").style.visibility = "visible";
		document.getElementById("ohmios").style.color = "#808080";
		document.getElementById("kiloohmios").style.visibility = "visible";
		document.getElementById("kiloohmios").style.color = "#141414";
		document.getElementById("megaohmios").style.visibility = "visible";
		document.getElementById("megaohmios").style.color = "#808080";
		document.getElementById("voltios").style.visibility = "visible";
		document.getElementById("voltios").style.color = "#808080";
		document.getElementById("milivoltios").style.visibility = "visible";
		document.getElementById("milivoltios").style.color = "#808080";
		document.getElementById("hfe").style.visibility = "visible";
		document.getElementById("hfe").style.color = "#808080";
		document.getElementById("miliamperios").style.visibility = "visible";
		document.getElementById("miliamperios").style.color = "#808080";
		document.getElementById("microamperios").style.visibility = "visible";
		document.getElementById("microamperios").style.color = "#808080";
		document.getElementById("AC").style.visibility = "visible";
		document.getElementById("AC").style.color = "#808080";
		
		magnitudAMedir = "Ohm";
		tipoMagnitudAMedir = null
		valorMaximo = 2000;
		valorMinimo = .0;

		break;
	
	case 20: //console.log("Ohm - 20k");
		document.getElementById("D7S_1a").style.visibility = "visible";
		document.getElementById("D7S_1a").style.fill = "#808080";
		document.getElementById("D7S_1b").style.visibility = "visible";
		document.getElementById("D7S_1b").style.fill = "#808080";
		document.getElementById("D7S_1c").style.visibility = "visible";
		document.getElementById("D7S_1c").style.fill = "#808080";
		document.getElementById("D7S_1d").style.visibility = "visible";
		document.getElementById("D7S_1d").style.fill = "#808080";
		document.getElementById("D7S_1e").style.visibility = "visible";
		document.getElementById("D7S_1e").style.fill = "#808080";
		document.getElementById("D7S_1f").style.visibility = "visible";
		document.getElementById("D7S_1f").style.fill = "#808080";
		document.getElementById("D7S_1g").style.visibility = "visible";
		document.getElementById("D7S_1g").style.fill = "#808080";

		document.getElementById("D7S_2a").style.visibility = "visible";
		document.getElementById("D7S_2a").style.fill = "#808080";
		document.getElementById("D7S_2b").style.visibility = "visible";
		document.getElementById("D7S_2b").style.fill = "#808080";
		document.getElementById("D7S_2c").style.visibility = "visible";
		document.getElementById("D7S_2c").style.fill = "#808080";
		document.getElementById("D7S_2d").style.visibility = "visible";
		document.getElementById("D7S_2d").style.fill = "#808080";
		document.getElementById("D7S_2e").style.visibility = "visible";
		document.getElementById("D7S_2e").style.fill = "#808080";
		document.getElementById("D7S_2f").style.visibility = "visible";
		document.getElementById("D7S_2f").style.fill = "#808080";
		document.getElementById("D7S_2g").style.visibility = "visible";
		document.getElementById("D7S_2g").style.fill = "#808080";

		document.getElementById("D7S_3a").style.visibility = "visible";
		document.getElementById("D7S_3a").style.fill = "#808080";
		document.getElementById("D7S_3b").style.visibility = "visible";
		document.getElementById("D7S_3b").style.fill = "#808080";
		document.getElementById("D7S_3c").style.visibility = "visible";
		document.getElementById("D7S_3c").style.fill = "#808080";
		document.getElementById("D7S_3d").style.visibility = "visible";
		document.getElementById("D7S_3d").style.fill = "#808080";
		document.getElementById("D7S_3e").style.visibility = "visible";
		document.getElementById("D7S_3e").style.fill = "#808080";
		document.getElementById("D7S_3f").style.visibility = "visible";
		document.getElementById("D7S_3f").style.fill = "#808080";
		document.getElementById("D7S_3g").style.visibility = "visible";
		document.getElementById("D7S_3g").style.fill = "#808080";

		document.getElementById("D7S_4a").style.visibility = "hidden";
		document.getElementById("D7S_4b").style.visibility = "visible";
		document.getElementById("D7S_4b").style.fill = "#141414";
		document.getElementById("D7S_4c").style.visibility = "visible";
		document.getElementById("D7S_4c").style.fill = "#141414";
		document.getElementById("D7S_4d").style.visibility = "hidden";
		document.getElementById("D7S_4e").style.visibility = "hidden";
		document.getElementById("D7S_4f").style.visibility = "hidden";
		document.getElementById("D7S_4g").style.visibility = "hidden";
		document.getElementById("signo").style.visibility = "visible";
		document.getElementById("signo").style.fill = "#808080";
		document.getElementById("punto1").style.visibility = "visible";
		document.getElementById("punto1").style.fill = "#808080";
		document.getElementById("punto2").style.visibility = "visible";
		document.getElementById("punto2").style.fill = "#808080";
		document.getElementById("punto3").style.visibility = "visible";
		document.getElementById("punto3").style.fill = "#808080";
		document.getElementById("punto4").style.visibility = "visible";
		document.getElementById("punto4").style.fill = "#808080";
		document.getElementById("ohmios").style.visibility = "visible";
		document.getElementById("ohmios").style.color = "#808080";
		document.getElementById("kiloohmios").style.visibility = "visible";
		document.getElementById("kiloohmios").style.color = "#141414";
		document.getElementById("megaohmios").style.visibility = "visible";
		document.getElementById("megaohmios").style.color = "#808080";
		document.getElementById("voltios").style.visibility = "visible";
		document.getElementById("voltios").style.color = "#808080";
		document.getElementById("milivoltios").style.visibility = "visible";
		document.getElementById("milivoltios").style.color = "#808080";
		document.getElementById("hfe").style.visibility = "visible";
		document.getElementById("hfe").style.color = "#808080";
		document.getElementById("miliamperios").style.visibility = "visible";
		document.getElementById("miliamperios").style.color = "#808080";
		document.getElementById("microamperios").style.visibility = "visible";
		document.getElementById("microamperios").style.color = "#808080";
		document.getElementById("AC").style.visibility = "visible";
		document.getElementById("AC").style.color = "#808080";
		
		magnitudAMedir = "Ohm";
		tipoMagnitudAMedir = null
		valorMaximo = 20000;
		valorMinimo = .0;
		
		break;
	
	case 21: //console.log("Ohm - 200k");
		document.getElementById("D7S_1a").style.visibility = "visible";
		document.getElementById("D7S_1a").style.fill = "#808080";
		document.getElementById("D7S_1b").style.visibility = "visible";
		document.getElementById("D7S_1b").style.fill = "#808080";
		document.getElementById("D7S_1c").style.visibility = "visible";
		document.getElementById("D7S_1c").style.fill = "#808080";
		document.getElementById("D7S_1d").style.visibility = "visible";
		document.getElementById("D7S_1d").style.fill = "#808080";
		document.getElementById("D7S_1e").style.visibility = "visible";
		document.getElementById("D7S_1e").style.fill = "#808080";
		document.getElementById("D7S_1f").style.visibility = "visible";
		document.getElementById("D7S_1f").style.fill = "#808080";
		document.getElementById("D7S_1g").style.visibility = "visible";
		document.getElementById("D7S_1g").style.fill = "#808080";

		document.getElementById("D7S_2a").style.visibility = "visible";
		document.getElementById("D7S_2a").style.fill = "#808080";
		document.getElementById("D7S_2b").style.visibility = "visible";
		document.getElementById("D7S_2b").style.fill = "#808080";
		document.getElementById("D7S_2c").style.visibility = "visible";
		document.getElementById("D7S_2c").style.fill = "#808080";
		document.getElementById("D7S_2d").style.visibility = "visible";
		document.getElementById("D7S_2d").style.fill = "#808080";
		document.getElementById("D7S_2e").style.visibility = "visible";
		document.getElementById("D7S_2e").style.fill = "#808080";
		document.getElementById("D7S_2f").style.visibility = "visible";
		document.getElementById("D7S_2f").style.fill = "#808080";
		document.getElementById("D7S_2g").style.visibility = "visible";
		document.getElementById("D7S_2g").style.fill = "#808080";

		document.getElementById("D7S_3a").style.visibility = "visible";
		document.getElementById("D7S_3a").style.fill = "#808080";
		document.getElementById("D7S_3b").style.visibility = "visible";
		document.getElementById("D7S_3b").style.fill = "#808080";
		document.getElementById("D7S_3c").style.visibility = "visible";
		document.getElementById("D7S_3c").style.fill = "#808080";
		document.getElementById("D7S_3d").style.visibility = "visible";
		document.getElementById("D7S_3d").style.fill = "#808080";
		document.getElementById("D7S_3e").style.visibility = "visible";
		document.getElementById("D7S_3e").style.fill = "#808080";
		document.getElementById("D7S_3f").style.visibility = "visible";
		document.getElementById("D7S_3f").style.fill = "#808080";
		document.getElementById("D7S_3g").style.visibility = "visible";
		document.getElementById("D7S_3g").style.fill = "#808080";

		document.getElementById("D7S_4a").style.visibility = "hidden";
		document.getElementById("D7S_4b").style.visibility = "visible";
		document.getElementById("D7S_4b").style.fill = "#141414";
		document.getElementById("D7S_4c").style.visibility = "visible";
		document.getElementById("D7S_4c").style.fill = "#141414";
		document.getElementById("D7S_4d").style.visibility = "hidden";
		document.getElementById("D7S_4e").style.visibility = "hidden";
		document.getElementById("D7S_4f").style.visibility = "hidden";
		document.getElementById("D7S_4g").style.visibility = "hidden";
		document.getElementById("signo").style.visibility = "visible";
		document.getElementById("signo").style.fill = "#808080";
		document.getElementById("punto1").style.visibility = "visible";
		document.getElementById("punto1").style.fill = "#808080";
		document.getElementById("punto2").style.visibility = "visible";
		document.getElementById("punto2").style.fill = "#808080";
		document.getElementById("punto3").style.visibility = "visible";
		document.getElementById("punto3").style.fill = "#808080";
		document.getElementById("punto4").style.visibility = "visible";
		document.getElementById("punto4").style.fill = "#808080";
		document.getElementById("ohmios").style.visibility = "visible";
		document.getElementById("ohmios").style.color = "#808080";
		document.getElementById("kiloohmios").style.visibility = "visible";
		document.getElementById("kiloohmios").style.color = "#141414";
		document.getElementById("megaohmios").style.visibility = "visible";
		document.getElementById("megaohmios").style.color = "#808080";
		document.getElementById("voltios").style.visibility = "visible";
		document.getElementById("voltios").style.color = "#808080";
		document.getElementById("milivoltios").style.visibility = "visible";
		document.getElementById("milivoltios").style.color = "#808080";
		document.getElementById("hfe").style.visibility = "visible";
		document.getElementById("hfe").style.color = "#808080";
		document.getElementById("miliamperios").style.visibility = "visible";
		document.getElementById("miliamperios").style.color = "#808080";
		document.getElementById("microamperios").style.visibility = "visible";
		document.getElementById("microamperios").style.color = "#808080";
		document.getElementById("AC").style.visibility = "visible";
		document.getElementById("AC").style.color = "#808080";
		
		magnitudAMedir = "Ohm";
		tipoMagnitudAMedir = null
		valorMaximo = 200000;
		valorMinimo = .0;
		
		break;
	
	case 22: //console.log("Ohm - 2M");
		document.getElementById("D7S_1a").style.visibility = "visible";
		document.getElementById("D7S_1a").style.fill = "#808080";
		document.getElementById("D7S_1b").style.visibility = "visible";
		document.getElementById("D7S_1b").style.fill = "#808080";
		document.getElementById("D7S_1c").style.visibility = "visible";
		document.getElementById("D7S_1c").style.fill = "#808080";
		document.getElementById("D7S_1d").style.visibility = "visible";
		document.getElementById("D7S_1d").style.fill = "#808080";
		document.getElementById("D7S_1e").style.visibility = "visible";
		document.getElementById("D7S_1e").style.fill = "#808080";
		document.getElementById("D7S_1f").style.visibility = "visible";
		document.getElementById("D7S_1f").style.fill = "#808080";
		document.getElementById("D7S_1g").style.visibility = "visible";
		document.getElementById("D7S_1g").style.fill = "#808080";

		document.getElementById("D7S_2a").style.visibility = "visible";
		document.getElementById("D7S_2a").style.fill = "#808080";
		document.getElementById("D7S_2b").style.visibility = "visible";
		document.getElementById("D7S_2b").style.fill = "#808080";
		document.getElementById("D7S_2c").style.visibility = "visible";
		document.getElementById("D7S_2c").style.fill = "#808080";
		document.getElementById("D7S_2d").style.visibility = "visible";
		document.getElementById("D7S_2d").style.fill = "#808080";
		document.getElementById("D7S_2e").style.visibility = "visible";
		document.getElementById("D7S_2e").style.fill = "#808080";
		document.getElementById("D7S_2f").style.visibility = "visible";
		document.getElementById("D7S_2f").style.fill = "#808080";
		document.getElementById("D7S_2g").style.visibility = "visible";
		document.getElementById("D7S_2g").style.fill = "#808080";

		document.getElementById("D7S_3a").style.visibility = "visible";
		document.getElementById("D7S_3a").style.fill = "#808080";
		document.getElementById("D7S_3b").style.visibility = "visible";
		document.getElementById("D7S_3b").style.fill = "#808080";
		document.getElementById("D7S_3c").style.visibility = "visible";
		document.getElementById("D7S_3c").style.fill = "#808080";
		document.getElementById("D7S_3d").style.visibility = "visible";
		document.getElementById("D7S_3d").style.fill = "#808080";
		document.getElementById("D7S_3e").style.visibility = "visible";
		document.getElementById("D7S_3e").style.fill = "#808080";
		document.getElementById("D7S_3f").style.visibility = "visible";
		document.getElementById("D7S_3f").style.fill = "#808080";
		document.getElementById("D7S_3g").style.visibility = "visible";
		document.getElementById("D7S_3g").style.fill = "#808080";

		document.getElementById("D7S_4a").style.visibility = "hidden";
		document.getElementById("D7S_4b").style.visibility = "visible";
		document.getElementById("D7S_4b").style.fill = "#141414";
		document.getElementById("D7S_4c").style.visibility = "visible";
		document.getElementById("D7S_4c").style.fill = "#141414";
		document.getElementById("D7S_4d").style.visibility = "hidden";
		document.getElementById("D7S_4e").style.visibility = "hidden";
		document.getElementById("D7S_4f").style.visibility = "hidden";
		document.getElementById("D7S_4g").style.visibility = "hidden";
		document.getElementById("signo").style.visibility = "visible";
		document.getElementById("signo").style.fill = "#808080";
		document.getElementById("punto1").style.visibility = "visible";
		document.getElementById("punto1").style.fill = "#808080";
		document.getElementById("punto2").style.visibility = "visible";
		document.getElementById("punto2").style.fill = "#808080";
		document.getElementById("punto3").style.visibility = "visible";
		document.getElementById("punto3").style.fill = "#808080";
		document.getElementById("punto4").style.visibility = "visible";
		document.getElementById("punto4").style.fill = "#808080";
		document.getElementById("ohmios").style.visibility = "visible";
		document.getElementById("ohmios").style.color = "#808080";
		document.getElementById("kiloohmios").style.visibility = "visible";
		document.getElementById("kiloohmios").style.color = "#808080";
		document.getElementById("megaohmios").style.visibility = "visible";
		document.getElementById("megaohmios").style.color = "#141414";
		document.getElementById("voltios").style.visibility = "visible";
		document.getElementById("voltios").style.color = "#808080";
		document.getElementById("milivoltios").style.visibility = "visible";
		document.getElementById("milivoltios").style.color = "#808080";
		document.getElementById("hfe").style.visibility = "visible";
		document.getElementById("hfe").style.color = "#808080";
		document.getElementById("miliamperios").style.visibility = "visible";
		document.getElementById("miliamperios").style.color = "#808080";
		document.getElementById("microamperios").style.visibility = "visible";
		document.getElementById("microamperios").style.color = "#808080";
		document.getElementById("AC").style.visibility = "visible";
		document.getElementById("AC").style.color = "#808080";
		
		magnitudAMedir = "Ohm";
		tipoMagnitudAMedir = null
		valorMaximo = 2000000;
		valorMinimo = .0;

		break;
	
	case 23: //console.log("Ohm - 20M");
		document.getElementById("D7S_1a").style.visibility = "visible";
		document.getElementById("D7S_1a").style.fill = "#808080";
		document.getElementById("D7S_1b").style.visibility = "visible";
		document.getElementById("D7S_1b").style.fill = "#808080";
		document.getElementById("D7S_1c").style.visibility = "visible";
		document.getElementById("D7S_1c").style.fill = "#808080";
		document.getElementById("D7S_1d").style.visibility = "visible";
		document.getElementById("D7S_1d").style.fill = "#808080";
		document.getElementById("D7S_1e").style.visibility = "visible";
		document.getElementById("D7S_1e").style.fill = "#808080";
		document.getElementById("D7S_1f").style.visibility = "visible";
		document.getElementById("D7S_1f").style.fill = "#808080";
		document.getElementById("D7S_1g").style.visibility = "visible";
		document.getElementById("D7S_1g").style.fill = "#808080";

		document.getElementById("D7S_2a").style.visibility = "visible";
		document.getElementById("D7S_2a").style.fill = "#808080";
		document.getElementById("D7S_2b").style.visibility = "visible";
		document.getElementById("D7S_2b").style.fill = "#808080";
		document.getElementById("D7S_2c").style.visibility = "visible";
		document.getElementById("D7S_2c").style.fill = "#808080";
		document.getElementById("D7S_2d").style.visibility = "visible";
		document.getElementById("D7S_2d").style.fill = "#808080";
		document.getElementById("D7S_2e").style.visibility = "visible";
		document.getElementById("D7S_2e").style.fill = "#808080";
		document.getElementById("D7S_2f").style.visibility = "visible";
		document.getElementById("D7S_2f").style.fill = "#808080";
		document.getElementById("D7S_2g").style.visibility = "visible";
		document.getElementById("D7S_2g").style.fill = "#808080";

		document.getElementById("D7S_3a").style.visibility = "visible";
		document.getElementById("D7S_3a").style.fill = "#808080";
		document.getElementById("D7S_3b").style.visibility = "visible";
		document.getElementById("D7S_3b").style.fill = "#808080";
		document.getElementById("D7S_3c").style.visibility = "visible";
		document.getElementById("D7S_3c").style.fill = "#808080";
		document.getElementById("D7S_3d").style.visibility = "visible";
		document.getElementById("D7S_3d").style.fill = "#808080";
		document.getElementById("D7S_3e").style.visibility = "visible";
		document.getElementById("D7S_3e").style.fill = "#808080";
		document.getElementById("D7S_3f").style.visibility = "visible";
		document.getElementById("D7S_3f").style.fill = "#808080";
		document.getElementById("D7S_3g").style.visibility = "visible";
		document.getElementById("D7S_3g").style.fill = "#808080";

		document.getElementById("D7S_4a").style.visibility = "hidden";
		document.getElementById("D7S_4b").style.visibility = "visible";
		document.getElementById("D7S_4b").style.fill = "#141414";
		document.getElementById("D7S_4c").style.visibility = "visible";
		document.getElementById("D7S_4c").style.fill = "#141414";
		document.getElementById("D7S_4d").style.visibility = "hidden";
		document.getElementById("D7S_4e").style.visibility = "hidden";
		document.getElementById("D7S_4f").style.visibility = "hidden";
		document.getElementById("D7S_4g").style.visibility = "hidden";
		document.getElementById("signo").style.visibility = "visible";
		document.getElementById("signo").style.fill = "#808080";
		document.getElementById("punto1").style.visibility = "visible";
		document.getElementById("punto1").style.fill = "#808080";
		document.getElementById("punto2").style.visibility = "visible";
		document.getElementById("punto2").style.fill = "#808080";
		document.getElementById("punto3").style.visibility = "visible";
		document.getElementById("punto3").style.fill = "#808080";
		document.getElementById("punto4").style.visibility = "visible";
		document.getElementById("punto4").style.fill = "#808080";
		document.getElementById("ohmios").style.visibility = "visible";
		document.getElementById("ohmios").style.color = "#808080";
		document.getElementById("kiloohmios").style.visibility = "visible";
		document.getElementById("kiloohmios").style.color = "#808080";
		document.getElementById("megaohmios").style.visibility = "visible";
		document.getElementById("megaohmios").style.color = "#141414";
		document.getElementById("voltios").style.visibility = "visible";
		document.getElementById("voltios").style.color = "#808080";
		document.getElementById("milivoltios").style.visibility = "visible";
		document.getElementById("milivoltios").style.color = "#808080";
		document.getElementById("hfe").style.visibility = "visible";
		document.getElementById("hfe").style.color = "#808080";
		document.getElementById("miliamperios").style.visibility = "visible";
		document.getElementById("miliamperios").style.color = "#808080";
		document.getElementById("microamperios").style.visibility = "visible";
		document.getElementById("microamperios").style.color = "#808080";
		document.getElementById("AC").style.visibility = "visible";
		document.getElementById("AC").style.color = "#808080";
		
		magnitudAMedir = "Ohm";
		tipoMagnitudAMedir = null
		valorMaximo = 20000000;
		valorMinimo = .0;

		break;
	
	default: break;
	}
}

//-----------------------------------------------------------------------------------------------------------------------
function representaFueraDeEscala()
{
	
	document.getElementById("D7S_1a").style.fill = "#808080";
	document.getElementById("D7S_1b").style.fill = "#808080";
	document.getElementById("D7S_1c").style.fill = "#808080";
	document.getElementById("D7S_1d").style.fill = "#808080";
	document.getElementById("D7S_1e").style.fill = "#808080";
	document.getElementById("D7S_1f").style.fill = "#808080";
	document.getElementById("D7S_1g").style.fill = "#808080";
	document.getElementById("D7S_2a").style.fill = "#808080";
	document.getElementById("D7S_2b").style.fill = "#808080";
	document.getElementById("D7S_2c").style.fill = "#808080";
	document.getElementById("D7S_2d").style.fill = "#808080";
	document.getElementById("D7S_2e").style.fill = "#808080";
	document.getElementById("D7S_2f").style.fill = "#808080";
	document.getElementById("D7S_2g").style.fill = "#808080";
	document.getElementById("D7S_3a").style.fill = "#808080";
	document.getElementById("D7S_3b").style.fill = "#808080";
	document.getElementById("D7S_3c").style.fill = "#808080";
	document.getElementById("D7S_3d").style.fill = "#808080";
	document.getElementById("D7S_3e").style.fill = "#808080";
	document.getElementById("D7S_3f").style.fill = "#808080";
	document.getElementById("D7S_3g").style.fill = "#808080";
	document.getElementById("D7S_4b").style.fill = "#141414";
	document.getElementById("D7S_4c").style.fill = "#141414";
	document.getElementById("punto1").style.fill = "#808080";
	document.getElementById("punto2").style.fill = "#808080";
	document.getElementById("punto3").style.fill = "#808080";
	document.getElementById("punto4").style.fill = "#808080";
}

//-----------------------------------------------------------------------------------------------------------------------
var myVar;

//-----------------------------------------------------------------------------------------------------------------------
function configuraValor(valorMedido)
{
	switch (indicePosicionSelector) {
	case 0:  //console.log("Multímetro apagado");
		break;
	case 1:  //console.log("VDC - 200mV");
		if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
			representaValor(valorMedido*10000);
		else
			representaFueraDeEscala()
		break;
	case 2:  //console.log("VDC - 2V");
		if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
			representaValor(valorMedido*1000);
		else
			representaFueraDeEscala()
		break;
	case 3:  //console.log("VDC - 20V");
		if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
			representaValor(valorMedido*100);
		else
			representaFueraDeEscala()
		break;
	case 4:  //console.log("VDC - 200V");
		if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
			representaValor(valorMedido*10);
		else
			representaFueraDeEscala()
		break;
	case 5:  //console.log("VDC - 1000V");
		if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
			representaValor(valorMedido*1);
		else
			representaFueraDeEscala()
		break;
	case 6:  //console.log("VAC - 750V");
		if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
			representaValor(valorMedido*1);
		else
			representaFueraDeEscala()
		break;
	case 7:  //console.log("VAC - 200V");
		if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
			representaValor(valorMedido*10);
		else
			representaFueraDeEscala()
		break;
	case 8:  //console.log("VAC - 20V");
		if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
			representaValor(valorMedido*100);
		else
			representaFueraDeEscala()
		break;
	case 9:  //console.log("VAC - 2V");
		if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
			representaValor(valorMedido*1000);
		else
			representaFueraDeEscala()
		break;
	case 10: //console.log("hFE");
		break;
	case 11: //console.log("AAC - 2mA");
		if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
			representaValor(valorMedido*1000000);
		else
			representaFueraDeEscala()
		break;
	case 12: //console.log("AAC - 20mA/10A");
		if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
			representaValor(valorMedido*100000);
		else
			representaFueraDeEscala()
		break;
	case 13: //console.log("AAC - 200mA");
		if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
			representaValor(valorMedido*10000);
		else
			representaFueraDeEscala()
		break;
	case 14: //console.log("ADC - 200mA");
		if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
			representaValor(valorMedido*10000);
		else
			representaFueraDeEscala()
		break;
	case 15: //console.log("ADC - 20mA/10A");
		if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
			representaValor(valorMedido*100000);
		else
			representaFueraDeEscala()
		break;
	case 16: //console.log("ADC - 2mA");
		if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
			representaValor(valorMedido*1000000);
		else
			representaFueraDeEscala()
		break;
	case 17: //console.log("ADC - 200uA");
		if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
			representaValor(valorMedido*10000000);
		else
			representaFueraDeEscala()
		break;
	case 18: //console.log("Ohm - 200");
		break;
	case 19: //console.log("Ohm - 2k");
		break;
	case 20: //console.log("Ohm - 20k");
		break;
	case 21: //console.log("Ohm - 200k");
		break;
	case 22: //console.log("Ohm - 2M");
		break;
	case 23: //console.log("Ohm - 20M");
		break;
	default:
		break;
	}
}

//-----------------------------------------------------------------------------------------------------------------------
function representaValor(valorARepresentar)
{
	
	var valorUnidad = Math.floor((valorARepresentar/1)%10);
	var valorDecena = Math.floor((valorARepresentar/10)%10);
	var valorCentena = Math.floor((valorARepresentar/100)%10);
	var valorMillar = Math.floor((valorARepresentar/1000)%10);
	
	//console.log(valorARepresentar);
	//console.log(valorUnidad);
	//console.log(valorDecena);
	//console.log(valorCentena);
	//console.log(valorMillar);
	if (valorARepresentar >= 0)
		document.getElementById("signo").style.fill = "#808080";
	else 
		document.getElementById("signo").style.fill = "#141414";

	switch (valorUnidad) {
	case 0:
		document.getElementById("D7S_1a").style.fill = "#141414"
		document.getElementById("D7S_1b").style.fill = "#141414";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.fill = "#141414";
		document.getElementById("D7S_1e").style.fill = "#141414";
		document.getElementById("D7S_1f").style.fill = "#141414";
		document.getElementById("D7S_1g").style.fill = "#808080";
		break;
	case 1:
		document.getElementById("D7S_1a").style.fill = "#808080";
		document.getElementById("D7S_1b").style.fill = "#141414";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.fill = "#808080";
		document.getElementById("D7S_1e").style.fill = "#808080";
		document.getElementById("D7S_1f").style.fill = "#808080";
		document.getElementById("D7S_1g").style.fill = "#808080";
		break;
	case 2:
		document.getElementById("D7S_1a").style.fill = "#141414";
		document.getElementById("D7S_1b").style.fill = "#141414";
		document.getElementById("D7S_1c").style.fill = "#808080";
		document.getElementById("D7S_1d").style.fill = "#141414";
		document.getElementById("D7S_1e").style.fill = "#141414";
		document.getElementById("D7S_1f").style.fill = "#808080";
		document.getElementById("D7S_1g").style.fill = "#141414";
		break;
	case 3:	
		document.getElementById("D7S_1a").style.fill = "#141414";
		document.getElementById("D7S_1b").style.fill = "#141414";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.fill = "#141414";
		document.getElementById("D7S_1e").style.fill = "#808080";
		document.getElementById("D7S_1f").style.fill = "#808080";
		document.getElementById("D7S_1g").style.fill = "#141414";
		break;
	case 4:
		document.getElementById("D7S_1a").style.fill = "#808080";
		document.getElementById("D7S_1b").style.fill = "#141414";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.fill = "#808080";
		document.getElementById("D7S_1e").style.fill = "#808080";
		document.getElementById("D7S_1f").style.fill = "#141414";
		document.getElementById("D7S_1g").style.fill = "#141414";
		break;
	case 5:
		document.getElementById("D7S_1a").style.fill = "#141414";
		document.getElementById("D7S_1b").style.fill = "#808080";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.fill = "#141414";
		document.getElementById("D7S_1e").style.fill = "#808080";
		document.getElementById("D7S_1f").style.fill = "#141414";
		document.getElementById("D7S_1g").style.fill = "#141414";
		break;
	case 6:	
		document.getElementById("D7S_1a").style.fill = "#141414";
		document.getElementById("D7S_1b").style.fill = "#808080";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.fill = "#141414";
		document.getElementById("D7S_1e").style.fill = "#141414";
		document.getElementById("D7S_1f").style.fill = "#141414";
		document.getElementById("D7S_1g").style.fill = "#141414";
		break;
	case 7:
		document.getElementById("D7S_1a").style.fill = "#141414";
		document.getElementById("D7S_1b").style.fill = "#141414";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.fill = "#808080";
		document.getElementById("D7S_1e").style.fill = "#808080";
		document.getElementById("D7S_1f").style.fill = "#808080";
		document.getElementById("D7S_1g").style.fill = "#808080";
		break;
	case 8:
		document.getElementById("D7S_1a").style.fill = "#141414";
		document.getElementById("D7S_1b").style.fill = "#141414";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.fill = "#141414";
		document.getElementById("D7S_1e").style.fill = "#141414";
		document.getElementById("D7S_1f").style.fill = "#141414";
		document.getElementById("D7S_1g").style.fill = "#141414";
		break;
	case 9:
		document.getElementById("D7S_1a").style.fill = "#141414";
		document.getElementById("D7S_1b").style.fill = "#141414";
		document.getElementById("D7S_1c").style.fill = "#141414";
		document.getElementById("D7S_1d").style.fill = "#141414";
		document.getElementById("D7S_1e").style.fill = "#808080";
		document.getElementById("D7S_1f").style.fill = "#141414";
		document.getElementById("D7S_1g").style.fill = "#141414";
		break;
	deault: break;
	}
	
	switch (valorDecena) {
	case 0:
		document.getElementById("D7S_2a").style.fill = "#141414";
		document.getElementById("D7S_2b").style.fill = "#141414";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.fill = "#141414";
		document.getElementById("D7S_2e").style.fill = "#141414";
		document.getElementById("D7S_2f").style.fill = "#141414";
		document.getElementById("D7S_2g").style.fill = "#808080";
		break;
	case 1:
		document.getElementById("D7S_2a").style.fill = "#808080";
		document.getElementById("D7S_2b").style.fill = "#141414";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.fill = "#808080";
		document.getElementById("D7S_2e").style.fill = "#808080";
		document.getElementById("D7S_2f").style.fill = "#808080";
		document.getElementById("D7S_2g").style.fill = "#808080";
		break;
	case 2:
		document.getElementById("D7S_2a").style.fill = "#141414";
		document.getElementById("D7S_2b").style.fill = "#141414";
		document.getElementById("D7S_2c").style.fill = "#808080";
		document.getElementById("D7S_2d").style.fill = "#141414";
		document.getElementById("D7S_2e").style.fill = "#141414";
		document.getElementById("D7S_2f").style.fill = "#808080";
		document.getElementById("D7S_2g").style.fill = "#141414";
		break;
	case 3:	
		document.getElementById("D7S_2a").style.fill = "#141414";
		document.getElementById("D7S_2b").style.fill = "#141414";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.fill = "#141414";
		document.getElementById("D7S_2e").style.fill = "#808080";
		document.getElementById("D7S_2f").style.fill = "#808080";
		document.getElementById("D7S_2g").style.fill = "#141414";
		break;
	case 4:
		document.getElementById("D7S_2a").style.fill = "#808080";
		document.getElementById("D7S_2b").style.fill = "#141414";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.fill = "#808080";
		document.getElementById("D7S_2e").style.fill = "#808080";
		document.getElementById("D7S_2f").style.fill = "#141414";
		document.getElementById("D7S_2g").style.fill = "#141414";
		break;
	case 5:
		document.getElementById("D7S_2a").style.fill = "#141414";
		document.getElementById("D7S_2b").style.fill = "#808080";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.fill = "#141414";
		document.getElementById("D7S_2e").style.fill = "#808080";
		document.getElementById("D7S_2f").style.fill = "#141414";
		document.getElementById("D7S_2g").style.fill = "#141414";
		break;
	case 6:	
		document.getElementById("D7S_2a").style.fill = "#141414";
		document.getElementById("D7S_2b").style.fill = "#808080";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.fill = "#141414";
		document.getElementById("D7S_2e").style.fill = "#141414";
		document.getElementById("D7S_2f").style.fill = "#141414";
		document.getElementById("D7S_2g").style.fill = "#141414";
		break;
	case 7:
		document.getElementById("D7S_2a").style.fill = "#141414";
		document.getElementById("D7S_2b").style.fill = "#141414";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.fill = "#808080";
		document.getElementById("D7S_2e").style.fill = "#808080";
		document.getElementById("D7S_2f").style.fill = "#808080";
		document.getElementById("D7S_2g").style.fill = "#808080";
		break;
	case 8:
		document.getElementById("D7S_1a").style.fill = "#141414";
		document.getElementById("D7S_2b").style.fill = "#141414";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.fill = "#141414";
		document.getElementById("D7S_2e").style.fill = "#141414";
		document.getElementById("D7S_2f").style.fill = "#141414";
		document.getElementById("D7S_2g").style.fill = "#141414";
		break;
	case 9:
		document.getElementById("D7S_2a").style.fill = "#141414";
		document.getElementById("D7S_2b").style.fill = "#141414";
		document.getElementById("D7S_2c").style.fill = "#141414";
		document.getElementById("D7S_2d").style.fill = "#141414";
		document.getElementById("D7S_2e").style.fill = "#808080";
		document.getElementById("D7S_2f").style.fill = "#141414";
		document.getElementById("D7S_2g").style.fill = "#141414";
		break;
	deault: break;
	}
	
	switch (valorCentena) {
	case 0:
		document.getElementById("D7S_3a").style.fill = "#141414";
		document.getElementById("D7S_3b").style.fill = "#141414";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.fill = "#141414";
		document.getElementById("D7S_3e").style.fill = "#141414";
		document.getElementById("D7S_3f").style.fill = "#141414";
		document.getElementById("D7S_3g").style.fill = "#808080";
		break;
	case 1:
		document.getElementById("D7S_3a").style.fill = "#808080";
		document.getElementById("D7S_3b").style.fill = "#141414";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.fill = "#808080";
		document.getElementById("D7S_3e").style.fill = "#808080";
		document.getElementById("D7S_3f").style.fill = "#808080";
		document.getElementById("D7S_3g").style.fill = "#808080";
		break;
	case 2:
		document.getElementById("D7S_3a").style.fill = "#141414";
		document.getElementById("D7S_3b").style.fill = "#141414";
		document.getElementById("D7S_3c").style.fill = "#808080";
		document.getElementById("D7S_3d").style.fill = "#141414";
		document.getElementById("D7S_3e").style.fill = "#141414";
		document.getElementById("D7S_3f").style.fill = "#808080";
		document.getElementById("D7S_3g").style.fill = "#141414";
		break;
	case 3:	
		document.getElementById("D7S_3a").style.fill = "#141414";
		document.getElementById("D7S_3b").style.fill = "#141414";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.fill = "#141414";
		document.getElementById("D7S_3e").style.fill = "#808080";
		document.getElementById("D7S_3f").style.fill = "#808080";
		document.getElementById("D7S_3g").style.fill = "#141414";
		break;
	case 4:
		document.getElementById("D7S_3a").style.fill = "#808080";
		document.getElementById("D7S_3b").style.fill = "#141414";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.fill = "#808080";
		document.getElementById("D7S_3e").style.fill = "#808080";
		document.getElementById("D7S_3f").style.fill = "#141414";
		document.getElementById("D7S_3g").style.fill = "#141414";
		break;
	case 5:
		document.getElementById("D7S_3a").style.fill = "#141414";
		document.getElementById("D7S_3b").style.fill = "#808080";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.fill = "#141414";
		document.getElementById("D7S_3e").style.fill = "#808080";
		document.getElementById("D7S_3f").style.fill = "#141414";
		document.getElementById("D7S_3g").style.fill = "#141414";
		break;
	case 6:	
		document.getElementById("D7S_3a").style.fill = "#141414";
		document.getElementById("D7S_3b").style.fill = "#808080";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.fill = "#141414";
		document.getElementById("D7S_3e").style.fill = "#141414";
		document.getElementById("D7S_3f").style.fill = "#141414";
		document.getElementById("D7S_3g").style.fill = "#141414";
		break;
	case 7:
		document.getElementById("D7S_3a").style.fill = "#141414";
		document.getElementById("D7S_3b").style.fill = "#141414";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.fill = "#808080";
		document.getElementById("D7S_3e").style.fill = "#808080";
		document.getElementById("D7S_3f").style.fill = "#808080";
		document.getElementById("D7S_3g").style.fill = "#808080";
		break;
	case 8:
		document.getElementById("D7S_3a").style.fill = "#141414";
		document.getElementById("D7S_3b").style.fill = "#141414";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.fill = "#141414";
		document.getElementById("D7S_3e").style.fill = "#141414";
		document.getElementById("D7S_3f").style.fill = "#141414";
		document.getElementById("D7S_3g").style.fill = "#141414";
		break;
	case 9:
		document.getElementById("D7S_3a").style.fill = "#141414";
		document.getElementById("D7S_3b").style.fill = "#141414";
		document.getElementById("D7S_3c").style.fill = "#141414";
		document.getElementById("D7S_3d").style.fill = "#141414";
		document.getElementById("D7S_3e").style.fill = "#808080";
		document.getElementById("D7S_3f").style.fill = "#141414";
		document.getElementById("D7S_3g").style.fill = "#141414";
		break;
	deault: break;
	}
	
	switch (valorMillar) {
	case 0:
		document.getElementById("D7S_4b").style.fill = "#808080";
		document.getElementById("D7S_4c").style.fill = "#808080";
		break;
	case 1:
		document.getElementById("D7S_4b").style.fill = "#141414";
		document.getElementById("D7S_4c").style.fill = "#141414";
		break;
	deault: break;
	}
}

//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
//Arrastre sonda roja
//-----------------------------------------------------------------------------------------------------------------------
function dragStartSondaRoja(e)
{
	posicionXSondaRoja = e.pageX - sondaRojaElement.offsetLeft;
	posicionYSondaRoja = e.pageY - sondaRojaElement.offsetTop;	
	
	addEventListener("mousemove", dragMoveSondaRoja);
	addEventListener("mouseup", dragEndSondaRoja);
}
//-----------------------------------------------------------------------------------------------------------------------
function dragMoveSondaRoja(e)
{
	sondaRojaElement.style.left = (e.pageX - posicionXSondaRoja);
	sondaRojaElement.style.top = (e.pageY - posicionYSondaRoja);

	if (((sondaRojaElement.style.left > "670px") && (sondaRojaElement.style.left < "705px"))
		&& ((sondaRojaElement.style.top > "369px") && (sondaRojaElement.style.top < "409px")))
	{
		document.getElementById('neutroBaseDeEnchufe').style.fill = "rgb(200,200,200,0.2)";
	}
	else if (((sondaRojaElement.style.left > "743px") && (sondaRojaElement.style.left < "778px"))
		&& ((sondaRojaElement.style.top > "369px") && (sondaRojaElement.style.top < "409px")))
	{
		document.getElementById('faseBaseDeEnchufe').style.fill = "rgb(200,200,200,0.2)";
	}
	else 
	{
		document.getElementById('neutroBaseDeEnchufe').style.fill = "transparent";
		document.getElementById('faseBaseDeEnchufe').style.fill = "transparent";
	}
}
//-----------------------------------------------------------------------------------------------------------------------
function dragEndSondaRoja(e) 
{
	if (((sondaRojaElement.style.left > "670px") && (sondaRojaElement.style.left < "705px"))
		&& ((sondaRojaElement.style.top > "369px") && (sondaRojaElement.style.top < "409px")))
	{
		sondaRojaElement.style.left = "689px";
		sondaRojaElement.style.top = "389px";
		console.log("Sonda Roja conectada a neutro");
		sondaRojaConectadaAFASE = false;
		sondaRojaConectadaANEUTRO = true;
		document.getElementById('aspaRojaPaso5').style.backgroundImage = "url('./images/aspaVerde.png')";
		document.getElementById('neutroBaseDeEnchufe').style.fill = "transparent";
	}
	else if (((sondaRojaElement.style.left > "743px") && (sondaRojaElement.style.left < "778px"))
		&& ((sondaRojaElement.style.top > "369px") && (sondaRojaElement.style.top < "409px")))
	{
		sondaRojaElement.style.left = "762px";
		sondaRojaElement.style.top = "389px";
		console.log("Sonda Roja conectada a fase");
		sondaRojaConectadaAFASE = true;
		sondaRojaConectadaANEUTRO = false;
		document.getElementById('aspaRojaPaso5').style.backgroundImage = "url('./images/aspaVerde.png')";
		document.getElementById('faseBaseDeEnchufe').style.fill = "transparent";
	}
	else
	{
	console.log("Sonda Roja desconectada");
	document.getElementById('aspaRojaPaso5').style.backgroundImage = "url('./images/aspaRoja.png')";
	sondaRojaConectadaAFASE = false;
	sondaRojaConectadaANEUTRO = false;
	}

	compruebaConexion();
	clearInterval(myVar);
	actualizaVisor();
	removeEventListener("mousemove", dragMoveSondaRoja);
	removeEventListener("mouseup", dragEndSondaRoja);
}

//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//Arrastre sonda negra
//-----------------------------------------------------------------------------------------------------------------------
function dragStartSondaNegra(e)
{
	posicionXSondaNegra = e.pageX - sondaNegraElement.offsetLeft;
	posicionYSondaNegra = e.pageY - sondaNegraElement.offsetTop;	
	addEventListener("mousemove", dragMoveSondaNegra);
	addEventListener("mouseup", dragEndSondaNegra);
}

//-----------------------------------------------------------------------------------------------------------------------
function dragMoveSondaNegra(e)
{
	sondaNegraElement.style.left = (e.pageX - posicionXSondaNegra);
	sondaNegraElement.style.top = (e.pageY - posicionYSondaNegra);

		if (((sondaNegraElement.style.left > "670px") && (sondaNegraElement.style.left < "705px"))
		&& ((sondaNegraElement.style.top > "369px") && (sondaNegraElement.style.top < "409")))
	{
		document.getElementById('neutroBaseDeEnchufe').style.fill = "rgb(200,200,200,0.2)";
	}
	else if (((sondaNegraElement.style.left > "743px") && (sondaNegraElement.style.left < "778px"))
		&& ((sondaNegraElement.style.top > "369") && (sondaNegraElement.style.top < "409")))
	{
		document.getElementById('faseBaseDeEnchufe').style.fill = "rgb(200,200,200,0.2)";
	}
	else
	{
		document.getElementById('neutroBaseDeEnchufe').style.fill = "transparent";
		document.getElementById('faseBaseDeEnchufe').style.fill = "transparent";
	}
}

//-----------------------------------------------------------------------------------------------------------------------
function dragEndSondaNegra()
{
	if (((sondaNegraElement.style.left > "670px") && (sondaNegraElement.style.left < "705px"))
		&& ((sondaNegraElement.style.top > "369px") && (sondaNegraElement.style.top < "409px")))
	{
		sondaNegraElement.style.left = "689px";
		sondaNegraElement.style.top = "389px";
		console.log("Sonda Negra conectada a neutro");
		document.getElementById('aspaRojaPaso4').style.backgroundImage = "url('./images/aspaVerde.png')";
		sondaNegraConectadaAFASE = false;
		sondaNegraConectadaANEUTRO = true;
		document.getElementById('neutroBaseDeEnchufe').style.fill = "transparent";
	}
	else if (((sondaNegraElement.style.left > "743px") && (sondaNegraElement.style.left < "778px"))
		&& ((sondaNegraElement.style.top > "369px") && (sondaNegraElement.style.top < "409px")))
	{
		sondaNegraElement.style.left = "762px";
		sondaNegraElement.style.top = "389px";
		console.log("Sonda Negra conectada a fase");
		document.getElementById('aspaRojaPaso4').style.backgroundImage = "url('./images/aspaVerde.png')";
		sondaNegraConectadaAFASE = true;
		sondaNegraConectadaANEUTRO = false;
		document.getElementById('faseBaseDeEnchufe').style.fill = "transparent";
	}
	else
	{
	console.log("Sonda Negra desconectada");
	document.getElementById('aspaRojaPaso4').style.backgroundImage = "url('./images/aspaRoja.png')";
	sondaNegraConectadaAFASE = false;
	sondaNegraConectadaANEUTRO = false;
	}

	compruebaConexion();
	clearInterval(myVar);
	actualizaVisor();
	removeEventListener("mousemove", dragMoveSondaNegra);
	removeEventListener("mouseup", dragEndSondaNegra);	
}

//-----------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//Arrastre conector rojo
//-----------------------------------------------------------------------------------------------------------------------
function dragStartConectorRojo(e)
{
	posicionXConectorRojo = e.pageX - conectorRojoElement.offsetLeft;
	posicionYConectorRojo = e.pageY - conectorRojoElement.offsetTop;	

	conectorRojoElement.style.backgroundImage = "url('./images/conectorRojo.png')"; 
	conectorRojoElement.style.backgroundRepeat = "no-repeat";

	addEventListener("mousemove", dragMoveConectorRojo);
	addEventListener("mouseup", dragEndConectorRojo);
}

//-----------------------------------------------------------------------------------------------------------------------
function dragMoveConectorRojo(e)
{
	//console.log("2o paso conectorRojo");

	conectorRojoElement.style.left = (e.pageX - posicionXConectorRojo);
	conectorRojoElement.style.top = (e.pageY - posicionYConectorRojo);

	if ((conectorRojoElement.style.left.substring(0,conectorRojoElement.style.left.length-2)) > 60
			&& (conectorRojoElement.style.left.substring(0,conectorRojoElement.style.left.length-2)) < 110
				&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) > 580
						&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) < 610)
	{
		document.getElementById('conexion10A').style.fill = "rgb(200,200,200,0.2)";
	}
	else if ((conectorRojoElement.style.left.substring(0,conectorRojoElement.style.left.length-2)) > 240
			&& (conectorRojoElement.style.left.substring(0,conectorRojoElement.style.left.length-2)) < 290
				&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) > 580
						&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) < 610)
	{
		document.getElementById('conexionVRA').style.fill = "rgb(200,200,200,0.2)";
	}
	else
	{
		document.getElementById('conexion10A').style.fill = "transparent";
		document.getElementById('conexionVRA').style.fill = "transparent";	
	}	
}

//-----------------------------------------------------------------------------------------------------------------------
function dragEndConectorRojo()
{
	if ((conectorRojoElement.style.left.substring(0,conectorRojoElement.style.left.length-2)) > 60
			&& (conectorRojoElement.style.left.substring(0,conectorRojoElement.style.left.length-2)) < 110
				&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) > 580
						&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) < 610)
	{
		document.getElementById('conexion10A').style.fill = "transparent";
		conectorRojoElement.style.left = "84px";
		conectorRojoElement.style.top = "653px";
		conectorRojoElement.style.backgroundImage = "url('./images/conectorRojoConectado.png')"; 
		conectorRojoElement.style.backgroundRepeat = "no-repeat";
		console.log("Conector Rojo conectado a puerto A10");
		document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaVerde.png')";
		conectorRojoConectadoA10A = true;
		conectorRojoConectadoAVRA = false;
	}
	else if ((conectorRojoElement.style.left.substring(0,conectorRojoElement.style.left.length-2)) > 240
			&& (conectorRojoElement.style.left.substring(0,conectorRojoElement.style.left.length-2)) < 290
				&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) > 580
						&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) < 610)
	{
		document.getElementById('conexionVRA').style.fill = "transparent";
		conectorRojoElement.style.left = "255px";
		conectorRojoElement.style.top = "653px";
		conectorRojoElement.style.backgroundImage = "url('./images/conectorRojoConectado.png')"; 
		conectorRojoElement.style.backgroundRepeat = "no-repeat";
		console.log("Conector Rojo conectado a puerto VRA");
		document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaVerde.png')";
		conectorRojoConectadoA10A = false;
		conectorRojoConectadoAVRA = true;
	}
	else
	{
		console.log("Conector rojo desconectado");
		document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaRoja.png')";
		conectorRojoElement.style.backgroundImage = "url('./images/conectorRojo.png')";
		conectorRojoConectadoA10A = false;
		conectorRojoConectadoAVRA = false;
	}

	compruebaConexion();
	clearInterval(myVar);
	actualizaVisor();
	removeEventListener("mousemove", dragMoveConectorRojo);
	removeEventListener("mouseup", dragEndConectorRojo);	
}

//-----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//Arrastre conector negro
function dragStartConectorNegro(e)
{
	posicionXConectorNegro = e.pageX - conectorNegroElement.offsetLeft;
	posicionYConectorNegro = e.pageY - conectorNegroElement.offsetTop;	

	conectorNegroElement.style.backgroundImage = "url('./images/conectorNegro.png')"; 
	conectorNegroElement.style.backgroundRepeat = "no-repeat";

	addEventListener("mousemove", dragMoveConectorNegro);
	addEventListener("mouseup", dragEndConectorNegro);
}

//-----------------------------------------------------------------------------------------------------------------------
function dragMoveConectorNegro(e)
{
	conectorNegroElement.style.left = (e.pageX - posicionXConectorNegro);
	conectorNegroElement.style.top = (e.pageY - posicionYConectorNegro);
	
	if ((conectorNegroElement.style.left.substring(0,conectorNegroElement.style.left.length-2)) > 30
			&& (conectorNegroElement.style.left.substring(0,conectorNegroElement.style.left.length-2)) < 60
				&& (conectorNegroElement.style.top.substring(0,conectorNegroElement.style.top.length-2)) > 580
					&& (conectorNegroElement.style.top.substring(0,conectorNegroElement.style.top.length-2)) < 610)
	{
		document.getElementById('conexionCOM').style.fill = "rgb(200,200,200,0.2)";
	//console.log(conectorNegroElement.style.left);
	//console.log(conectorNegroElement.style.top);

	}
	else
	{
		document.getElementById('conexionCOM').style.fill = "transparent";
	}
}

//-----------------------------------------------------------------------------------------------------------------------
function dragEndConectorNegro()
{
	if ((conectorNegroElement.style.left.substring(0,conectorNegroElement.style.left.length-2)) > 30
			&& (conectorNegroElement.style.left.substring(0,conectorNegroElement.style.left.length-2)) < 60
				&& (conectorNegroElement.style.top.substring(0,conectorNegroElement.style.top.length-2)) > 580
					&& (conectorNegroElement.style.top.substring(0,conectorNegroElement.style.top.length-2)) < 610)
	{
		document.getElementById('conexionCOM').style.fill = "transparent";
		conectorNegroElement.style.left = "169px";
		conectorNegroElement.style.top = "653px";
		conectorNegroElement.style.backgroundImage = "url('./images/conectorNegroConectado.png')"; 
		conectorNegroElement.style.backgroundRepeat = "no-repeat";
		console.log("Conector Negro conectado a puerto COM");
		document.getElementById('aspaRojaPaso2').style.backgroundImage = "url('./images/aspaVerde.png')";
		conectorNegroConectadoACOM = true;

	}
	else
	{
		console.log("Conector negro desconectado");
		document.getElementById('aspaRojaPaso2').style.backgroundImage = "url('./images/aspaRoja.png')";
		conectorNegroConectadoACOM = false;
		conectorNegroElement.style.backgroundImage = "url('./images/conectorNegro.png')";
	}
	
	compruebaConexion();
	clearInterval(myVar);
	actualizaVisor();
	removeEventListener("mousemove", dragMoveConectorNegro);
	removeEventListener("mouseup", dragEndConectorNegro);	
}

//-----------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------
function actualizaVisor() {
	myVar = setInterval(determinaValor, Math.random()*400);
}

//-----------------------------------------------------------------------------------------------------------------------
function compruebaConexion()
{
	switch (casoDeUso)
	{
		case 0: {} //polímetro sin conexiones
		case 1: //conectar puntas
		case 2: //medidas de voltaje en base de enchufe
			if (((sondaRojaConectadaAFASE == true && sondaNegraConectadaANEUTRO == true)
				|| (sondaRojaConectadaANEUTRO == true && sondaNegraConectadaAFASE == true))
				&& conectorRojoConectadoA10A == false && conectorRojoConectadoAVRA == true && conectorNegroConectadoACOM == true)
				conexionCorrecta = true;
			else
				conexionCorrecta = false;
			break;
		default: break;
	}
}

//-----------------------------------------------------------------------------------------------------------------------
function determinaValor()
{
	//clearInterval(myVar);
	
	magnitudMedida = "V";
	tipoMagnitudMedida = "DC";

	switch (casoDeUso)
	{
		case 0: {} //polímetro sin conexiones
		case 1: //conectar puntas
		case 2: //medidas de voltaje en base de enchufe
		{
			switch (indicePosicionSelector)
			{
				case 0:  //console.log("Multímetro apagado");
				case 1:  //console.log("VDC - 200mV");
				case 2:  //console.log("VDC - 2V");
				case 3:  //console.log("VDC - 20V");
				case 4:  //console.log("VDC - 200V");
				case 5:  //console.log("VDC - 1000V");
					configuraValor(0 + Math.random()*4/1000 - 8/10000);
					document.getElementById('aspaRojaPaso1').style.backgroundImage = "url('./images/aspaRoja.png')";
					break;
				case 6:  //console.log("VAC - 750V");
					document.getElementById('aspaRojaPaso1').style.backgroundImage = "url('./images/aspaVerde.png')";
					if (conexionCorrecta == true) configuraValor(232);
					else configuraValor(0);
					break;
				case 7:  //console.log("VAC - 200V");
					representaFueraDeEscala();
					document.getElementById('aspaRojaPaso1').style.backgroundImage = "url('./images/aspaRoja.png')";
					break;
				case 8:  //console.log("VAC - 20V");
					representaFueraDeEscala();
					document.getElementById('aspaRojaPaso1').style.backgroundImage = "url('./images/aspaRoja.png')";
					break;				
				case 9:  //console.log("VAC - 2V");
					representaFueraDeEscala();
					document.getElementById('aspaRojaPaso1').style.backgroundImage = "url('./images/aspaRoja.png')";
					break;				
				case 10: //console.log("hFE");
					break;
				case 11: //console.log("AAC - 2mA");
					if (conexionCorrecta == true && estadoFusiblePosicionSelector[11] == "Correcto")
					{
						audioExplosionElement.play();
						estadoFusiblePosicionSelector[11] = "Fundido";
					}
					break
				case 12: //console.log("AAC - 20mA/10A");
					if (conexionCorrecta == true && estadoFusiblePosicionSelector[12] == "Correcto")
					{
						audioExplosionElement.play();
						estadoFusiblePosicionSelector[12] = "Fundido";
					}
					break
				case 13: //console.log("AAC - 200mA");
					if (conexionCorrecta == true && estadoFusiblePosicionSelector[13] == "Correcto")
					{
						audioExplosionElement.play();
						estadoFusiblePosicionSelector[13] = "Fundido";
					}
					break
				case 14: //console.log("ADC - 200mA");
					if (conexionCorrecta == true && estadoFusiblePosicionSelector[14] == "Correcto")
					{
						audioExplosionElement.play();
						estadoFusiblePosicionSelector[14] = "Fundido";
					}
					break
				case 15: //console.log("ADC - 20mA/10A");
					if (conexionCorrecta == true && estadoFusiblePosicionSelector[15] == "Correcto")
					{
						audioExplosionElement.play();
						estadoFusiblePosicionSelector[15] = "Fundido";
					}
					break
				case 16: //console.log("ADC - 2mA");
					if (conexionCorrecta == true && estadoFusiblePosicionSelector[16] == "Correcto")
					{
						audioExplosionElement.play();
						estadoFusiblePosicionSelector[16] = "Fundido";
					}
					break
				case 17: //console.log("ADC - 200uA");
					if (conexionCorrecta == true && estadoFusiblePosicionSelector[17] == "Correcto")
					{
						audioExplosionElement.play();
						estadoFusiblePosicionSelector[17] = "Fundido";
					}
					break
				case 18: //console.log("Ohm - 200");
				case 19: //console.log("Ohm - 2k");
				case 20: //console.log("Ohm - 20k");
				case 21: //console.log("Ohm - 200k");
				case 22: //console.log("Ohm - 2M");
				case 23: //console.log("Ohm - 20M");
					document.getElementById('aspaRojaPaso1').style.backgroundImage = "url('./images/aspaRoja.png')";
				default:
					document.getElementById('aspaRojaPaso1').style.backgroundImage = "url('./images/aspaRoja.png')";
					break;
			}
		}
	}
}
/*
	else if (magnitudAMedir == "V" && magnitudMedida == "V" //caso pila
		&& tipoMagnitudAMedir == "DC" && tipoMagnitudMedida == "DC"
			&& indicePosicionSelector == 2)
		configuraValor(0 + Math.random()/200-0.002);

	else if (magnitudAMedir == "V" && magnitudMedida == "V" //caso pila
		&& tipoMagnitudAMedir == "DC" && tipoMagnitudMedida == "DC"
			&& indicePosicionSelector == 3)
		configuraValor(0 + Math.random()/20-0.02);

	else if (magnitudAMedir == "V" && magnitudMedida == "V" //caso pila
		&& tipoMagnitudAMedir == "DC" && tipoMagnitudMedida == "DC"
			&& indicePosicionSelector == 4)
		configuraValor(0 + Math.random()/2-0.2);

	else if (magnitudAMedir == "V" && magnitudMedida == "V" //caso pila
		&& tipoMagnitudAMedir == "DC" && tipoMagnitudMedida == "DC"
			&& indicePosicionSelector == 5)
		configuraValor(0);

	else if (magnitudAMedir == "V" && magnitudMedida == "V" //caso base de enchufe
			&& tipoMagnitudAMedir == "AC" && tipoMagnitudMedida == "AC"
				&& sondaRojaConectadaAFASE == true && sondaNegraConectadaANEUTRO == true
					&& conectorNegroConectadoACOM == true && conectorRojoConectadoAVRA == true)
		configuraValor(230);
	else if (magnitudAMedir == "V" && magnitudMedida == "V" //caso medimos pila en alterna
			&& tipoMagnitudAMedir == "DC" && tipoMagnitudMedida == "AC"
				&& sondaRojaConectadaAFASE == true && sondaNegraConectadaANEUTRO == true
					&& conectorNegroConectadoACOM == true && conectorRojoConectadoAVRA == true)
		configuraValor(0);	
	else if (magnitudAMedir == "V" && magnitudMedida == "V" //caso medimos base de enchufe en continua
			&& tipoMagnitudAMedir == "AC" && tipoMagnitudMedida == "DC"
				&& sondaRojaConectadaAFASE == true && sondaNegraConectadaANEUTRO == true
					&& conectorNegroConectadoACOM == true && conectorRojoConectadoAVRA == true)
		configuraValor(0);
	else if (magnitudAMedir == "A" && magnitudMedida == "V") //¿¿??
			console.log("¿¿??");
	else if (magnitudAMedir == "V" && magnitudMedida == "A") //castañazo
			console.log("castañazo");
	else
		configuraValor(0);	
		console.log("Conexión incompleta para mostrar valor");
}*/
