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
	var valorMaximo10A;
	var valorMinimo10A;

	var secadorElement = document.getElementById('secador');	
	secadorElement.addEventListener("click", seleccionaReceptorSecador);
	var receptorActivoSecador = false;

	var cadenaElement = document.getElementById('cadena');	
	cadenaElement.addEventListener("click", seleccionaReceptorCadena);
	var receptorActivoCadena = false;
	
	var estufaElement = document.getElementById('estufa');	
	estufaElement.addEventListener("click", seleccionaReceptorEstufa);
	var receptorActivoEstufa = false;
	
	var selectorElement = document.getElementById('selector');	
	selectorElement.addEventListener("click", determinaPosicionSelector);
	selectorElement.addEventListener("auxclick", determinaPosicionSelector);

	var sondaRojaElement = document.getElementById('sondaRoja'), posicionXSondaRoja = 0, posicionYSondaRoja = 0;
	var sondaRojaConectadaARegletaFase1 = false, sondaRojaConectadaARegletaFase2 = false,
	sondaRojaConectadaARegletaNeutro1 = false, sondaRojaConectadaARegletaNeutro2 = false;
	sondaRojaElement.addEventListener("mousedown", dragStartSondaRoja);

	var sondaNegraElement = document.getElementById('sondaNegra'), posicionXSondaNegra = 0, posicionYSondaNegra = 0;
	var sondaNegraConectadaARegletaFase1 = false, sondaNegraConectadaARegletaFase2 = false,
	sondaNegraConectadaARegletaNeutro1 = false, sondaNegraConectadaARegletaNeutro2 = false;
	sondaNegraElement.addEventListener("mousedown", dragStartSondaNegra);

	var conectorRojoElement = document.getElementById('conectorRojo'), posicionXConectorRojo = 0, posicionYConectorRojo = 0;
	var conectorRojoConectadoA10A = false, conectorRojoConectadoAVRA = false, conectorRojoConectadoACOM = false;
	conectorRojoElement.addEventListener("mousedown", dragStartConectorRojo);

	var conectorNegroElement = document.getElementById('conectorNegro'), posicionXConectorNegro = 0, posicionYConectorNegro = 0;
	var conectorNegroConectadoA10A = false, conectorRojoConectadoAVRA = false, conectorNegroConectadoACOM = false;
	conectorNegroElement.addEventListener("mousedown", dragStartConectorNegro);

	var puenteNeutroElement = document.getElementById('puenteNeutro'), posicionXpuenteNeutro = 0, posicionYpuenteNeutro = 0;
	var puenteNeutroConectadoARegleta = true;
	puenteNeutroElement.addEventListener("mousedown", dragStartPuenteNeutro);

	var puenteFaseElement = document.getElementById('puenteFase'), posicionXpuenteFase = 0, posicionYpuenteFase = 0;
	var puenteFaseConectadoARegleta = true;
	puenteFaseElement.addEventListener("mousedown", dragStartPuenteFase);

	var conexionCorrectaParaMedicion;
	var conexionCorrectaParaReceptor;
	var potenciaReceptor = 0;
	var VoltajeAC = 230;

	var audioExplosionElement = document.getElementById("audioExplosion");
	var audioSecadorElement = document.getElementById("audioSecador");
	var audioCadenaElement = document.getElementById("audioCadena");


//-----------------------------------------------------------------------------------------------------------------------
function actualizaReceptor()
{
	compruebaConexion();

	if (receptorActivoSecador == true)
	{
		audioCadenaElement.pause();
		document.getElementById('aspaRojaPaso7').style.backgroundImage = "url('./images/aspaVerde.png')";

		if (conexionCorrectaParaReceptor == true)
		{
			audioSecadorElement.play();
			potenciaReceptor = 1000;

		}
		else
		{
			audioSecadorElement.pause();
			potenciaReceptor = 0;	
		}
	}

	else if (receptorActivoCadena == true)
	{

		audioSecadorElement.pause();
		document.getElementById('aspaRojaPaso7').style.backgroundImage = "url('./images/aspaVerde.png')";
		if (conexionCorrectaParaReceptor == true)
		{
			audioCadenaElement.play();
			potenciaReceptor = 200;
		}
		else
		{
			audioCadenaElement.pause();
			potenciaReceptor = 0;	
		}
	}

	else if (receptorActivoEstufa == true)
	{
		audioSecadorElement.pause();
		audioCadenaElement.pause();
		potenciaReceptor = 2000;
		document.getElementById('aspaRojaPaso7').style.backgroundImage = "url('./images/aspaVerde.png')";
	}	
	else
	{
		audioSecadorElement.pause();
		audioCadenaElement.pause();
		potenciaReceptor = 0;	
		document.getElementById('aspaRojaPaso7').style.backgroundImage = "url('./images/aspaRoja.png')";
	}
}

//-----------------------------------------------------------------------------------------------------------------------
function seleccionaReceptorSecador()
{
	if (receptorActivoSecador == false)
	{	
		receptorActivoSecador = true;
		secadorElement.style.border = "5px solid blue";
	}
	else
	{
		receptorActivoSecador = false;
		secadorElement.style.border = "2px solid black";
	}
		
	receptorActivoCadena = false;
	cadenaElement.style.border = "2px solid black";
	receptorActivoEstufa = false;
	estufaElement.style.border = "2px solid black";

	actualizaReceptor();

}

//-----------------------------------------------------------------------------------------------------------------------
function seleccionaReceptorCadena()
{
	if (receptorActivoCadena == false)
	{
		receptorActivoCadena = true;
		cadenaElement.style.border = "5px solid blue";
	}
	else
	{
		receptorActivoCadena = false;
		cadenaElement.style.border = "2px solid black";
	}

	receptorActivoSecador = false;
	secadorElement.style.border = "2px solid black";
	receptorActivoEstufa = false;
	estufaElement.style.border = "2px solid black";

	actualizaReceptor();

}

//-----------------------------------------------------------------------------------------------------------------------
function seleccionaReceptorEstufa()
{
	if (receptorActivoEstufa == false)
	{
		receptorActivoEstufa = true;
		estufaElement.style.border = "5px solid blue";
	}
	else
	{
		receptorActivoEstufa = false;
		estufaElement.style.border = "2px solid black";
	}

	receptorActivoCadena = false;
	cadenaElement.style.border = "2px solid black";
	receptorActivoSecador = false;
	secadorElement.style.border = "2px solid black";

	actualizaReceptor();

}

//-----------------------------------------------------------------------------------------------------------------------
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
		valorMaximo10A = 10.;
		valorMinimo10A = -10.;

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
			representaFueraDeEscala();
		break;
	case 9:  //console.log("VAC - 2V");
		if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
			representaValor(valorMedido*1000);
		else
			representaFueraDeEscala();
		break;
	case 10: //console.log("hFE");
		break;
	case 11: //console.log("AAC - 2mA");
		if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
			representaValor(valorMedido*1000000);
		else
			representaFueraDeEscala();
		break;
	case 12: //console.log("AAC - 20mA/10A");
		if (conectorRojoConectadoAVRA == true)
			if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
				representaValor(valorMedido*1000000);
			else
				representaFueraDeEscala();
		else if (conectorRojoConectadoA10A == true)
			if (valorMedido <= valorMaximo10A && valorMedido >= valorMinimo10A)
				representaValor(valorMedido*100);
			else
				representaFueraDeEscala();
		break;
	case 13: //console.log("AAC - 200mA");
		if (conectorRojoConectadoAVRA == true)
			if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
				representaValor(valorMedido*10000);
			else
				representaFueraDeEscala()
		else
			console.log("Assert línea 2398");
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

	if ((sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) > 485
			&& (sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) < 505
				&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) > 210
					&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) < 240)
	{
		document.getElementById('regletaPuenteNeutro').style.fill = "rgb(200,200,200,1)";
		sondaRojaConectadaARegletaNeutro1 = true;
		compruebaConexion();
	}
	else if ((sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) > 656
			&& (sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) < 676
				&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) > 221
					&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) < 251)
	{
		document.getElementById('regletaPuenteNeutro2').style.fill = "rgb(200,200,200,1)";
		sondaRojaConectadaARegletaNeutro2 = true;
		compruebaConexion();
	}
	else if ((sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) > 516
			&& (sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) < 536
				&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) > 213
					&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) < 243)
	{
		document.getElementById('regletaPuenteFase').style.fill = "rgb(200,200,200,1)";
		sondaRojaConectadaARegletaFase1 = true;
		compruebaConexion();
	}
	else if ((sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) > 626
			&& (sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) < 646
				&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) > 218
					&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) < 248)
	{
		document.getElementById('regletaPuenteFase2').style.fill = "rgb(200,200,200,1)";
		sondaRojaConectadaARegletaFase2 = true;
		compruebaConexion();
	}
	else 
	{
		document.getElementById('regletaPuenteFase').style.fill = "transparent";
		document.getElementById('regletaPuenteFase2').style.fill = "transparent";
		document.getElementById('regletaPuenteNeutro').style.fill = "transparent";
		document.getElementById('regletaPuenteNeutro2').style.fill = "transparent";
		sondaRojaConectadaARegletaNeutro1 = false;
		sondaRojaConectadaARegletaNeutro2 = false;
		sondaRojaConectadaARegletaFase1 = false;
		sondaRojaConectadaARegletaFase2 = false;
	}

	actualizaReceptor();
	actualizaVisor();
	
}
//-----------------------------------------------------------------------------------------------------------------------
function dragEndSondaRoja(e) 

{
	if ((sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) > 485
			&& (sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) < 505
				&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) > 210
					&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) < 240)
	{
		sondaRojaElement.style.left = "498px";
		sondaRojaElement.style.top = "217px";
		console.log("Sonda Roja conectada a neutro");
		sondaRojaConectadaARegletaNeutro1 = true;
		sondaRojaConectadaARegletaNeutro2 = false;
		document.getElementById('aspaRojaPaso6').style.backgroundImage = "url('./images/aspaVerde.png')";
		document.getElementById('regletaPuenteNeutro').style.fill = "transparent";
	}
	else if ((sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) > 656
			&& (sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) < 676
				&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) > 221
					&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) < 251)
	{
		sondaRojaElement.style.left = "670px";
		sondaRojaElement.style.top = "228px";
		console.log("Sonda Roja conectada a fase");
		sondaRojaConectadaARegletaNeutro1 = false;
		sondaRojaConectadaARegletaNeutro2 = true;
		document.getElementById('aspaRojaPaso5').style.backgroundImage = "url('./images/aspaVerde.png')";
		document.getElementById('regletaPuenteNeutro6').style.fill = "transparent";
	}
	else if ((sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) > 516
			&& (sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) < 536
				&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) > 213
					&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) < 243)
	{
		sondaRojaElement.style.left = "529px";
		sondaRojaElement.style.top = "220px";
		console.log("Sonda Roja conectada a fase");
		sondaRojaConectadaARegletaFase1 = true;
		sondaRojaConectadaARegletaFase2 = false;
		document.getElementById('aspaRojaPaso6').style.backgroundImage = "url('./images/aspaVerde.png')";
		document.getElementById('regletaPuenteFase').style.fill = "transparent";
	}
	else if ((sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) > 626
			&& (sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) < 646
				&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) > 218
					&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) < 248)
	{
		sondaRojaElement.style.left = "639px";
		sondaRojaElement.style.top = "225px";
		console.log("Sonda Roja conectada a fase");
		sondaRojaConectadaARegletaFase1 = false;
		sondaRojaConectadaARegletaFase2 = true;
		document.getElementById('aspaRojaPaso6').style.backgroundImage = "url('./images/aspaVerde.png')";
		document.getElementById('regletaPuenteFase2').style.fill = "transparent";
	}
	else
	{
	console.log("Sonda Roja desconectada");
	document.getElementById('aspaRojaPaso6').style.backgroundImage = "url('./images/aspaRoja.png')";
	sondaRojaConectadaARegletaFase1 = false;
	sondaRojaConectadaARegletaFase2 = false;
	sondaRojaConectadaARegletaNeutro1 = false;
	sondaRojaConectadaARegletaNeutro2 = false;
	
	}

	clearInterval(myVar);
	actualizaReceptor();
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

	if ((sondaNegraElement.style.left.substring(0,sondaNegraElement.style.left.length-2)) > 485
			&& (sondaNegraElement.style.left.substring(0,sondaNegraElement.style.left.length-2)) < 505
				&& (sondaNegraElement.style.top.substring(0,sondaNegraElement.style.top.length-2)) > 210
					&& (sondaNegraElement.style.top.substring(0,sondaNegraElement.style.top.length-2)) < 240)
	{
		document.getElementById('regletaPuenteNeutro').style.fill = "rgb(200,200,200,1)";
		sondaNegraConectadaARegletaNeutro1 = true;
	}
	else if ((sondaNegraElement.style.left.substring(0,sondaNegraElement.style.left.length-2)) > 656
			&& (sondaNegraElement.style.left.substring(0,sondaNegraElement.style.left.length-2)) < 676
				&& (sondaNegraElement.style.top.substring(0,sondaNegraElement.style.top.length-2)) > 221
					&& (sondaNegraElement.style.top.substring(0,sondaNegraElement.style.top.length-2)) < 251)
	{
		document.getElementById('regletaPuenteNeutro2').style.fill = "rgb(200,200,200,1)";
		sondaNegraConectadaARegletaNeutro2 = true;
	}
	else if ((sondaNegraElement.style.left.substring(0,sondaNegraElement.style.left.length-2)) > 516
			&& (sondaNegraElement.style.left.substring(0,sondaNegraElement.style.left.length-2)) < 536
				&& (sondaNegraElement.style.top.substring(0,sondaNegraElement.style.top.length-2)) > 213
					&& (sondaNegraElement.style.top.substring(0,sondaNegraElement.style.top.length-2)) < 243)
	{
		document.getElementById('regletaPuenteFase').style.fill = "rgb(200,200,200,1)";
		sondaNegraConectadaARegletaFase1 = true;
	}
	else if ((sondaNegraElement.style.left.substring(0,sondaNegraElement.style.left.length-2)) > 626
			&& (sondaNegraElement.style.left.substring(0,sondaNegraElement.style.left.length-2)) < 646
				&& (sondaNegraElement.style.top.substring(0,sondaNegraElement.style.top.length-2)) > 218
					&& (sondaNegraElement.style.top.substring(0,sondaNegraElement.style.top.length-2)) < 248)
	{
		document.getElementById('regletaPuenteFase2').style.fill = "rgb(200,200,200,1)";
		sondaNegraConectadaARegletaFase2 = true;
	}
	else 
	{
		document.getElementById('regletaPuenteFase').style.fill = "transparent";
		document.getElementById('regletaPuenteFase2').style.fill = "transparent";
		document.getElementById('regletaPuenteNeutro').style.fill = "transparent";
		document.getElementById('regletaPuenteNeutro2').style.fill = "transparent";
		sondaNegraConectadaARegletaNeutro1 = false;
		sondaNegraConectadaARegletaNeutro2 = false;
		sondaNegraConectadaARegletaFase1 = false;
		sondaNegraConectadaARegletaFase2 = false;
	}

	actualizaReceptor();
	actualizaVisor();
}

//-----------------------------------------------------------------------------------------------------------------------
function dragEndSondaNegra()
{
if ((sondaNegraElement.style.left.substring(0,sondaNegraElement.style.left.length-2)) > 485
			&& (sondaNegraElement.style.left.substring(0,sondaNegraElement.style.left.length-2)) < 505
				&& (sondaNegraElement.style.top.substring(0,sondaNegraElement.style.top.length-2)) > 210
					&& (sondaNegraElement.style.top.substring(0,sondaNegraElement.style.top.length-2)) < 240)
	{
		sondaNegraElement.style.left = "498px";
		sondaNegraElement.style.top = "217px";
		console.log("Sonda Negra conectada a neutro");
		sondaNegraConectadaARegletaNeutro1 = true;
		sondaNegraConectadaARegletaNeutro2 = false;
		document.getElementById('aspaRojaPaso5').style.backgroundImage = "url('./images/aspaVerde.png')";
		document.getElementById('regletaPuenteNeutro').style.fill = "transparent";
	}
	else if ((sondaNegraElement.style.left.substring(0,sondaNegraElement.style.left.length-2)) > 656
			&& (sondaNegraElement.style.left.substring(0,sondaNegraElement.style.left.length-2)) < 676
				&& (sondaNegraElement.style.top.substring(0,sondaNegraElement.style.top.length-2)) > 221
					&& (sondaNegraElement.style.top.substring(0,sondaNegraElement.style.top.length-2)) < 251)
	{
		sondaNegraElement.style.left = "670px";
		sondaNegraElement.style.top = "228px";
		console.log("Sonda Negra conectada a fase");
		sondaNegraConectadaARegletaNeutro1 = false;
		sondaNegraConectadaARegletaNeutro2 = true;
		document.getElementById('aspaRojaPaso5').style.backgroundImage = "url('./images/aspaVerde.png')";
		document.getElementById('regletaPuenteNeutro2').style.fill = "transparent";
	}
	else if ((sondaNegraElement.style.left.substring(0,sondaNegraElement.style.left.length-2)) > 516
			&& (sondaNegraElement.style.left.substring(0,sondaNegraElement.style.left.length-2)) < 536
				&& (sondaNegraElement.style.top.substring(0,sondaNegraElement.style.top.length-2)) > 213
					&& (sondaNegraElement.style.top.substring(0,sondaNegraElement.style.top.length-2)) < 243)
	{
		sondaNegraElement.style.left = "529px";
		sondaNegraElement.style.top = "220px";
		console.log("Sonda Negra conectada a fase");
		sondaNegraConectadaARegletaFase1 = true;
		sondaNegraConectadaARegletaFase2 = false;
		document.getElementById('aspaRojaPaso5').style.backgroundImage = "url('./images/aspaVerde.png')";
		document.getElementById('regletaPuenteFase').style.fill = "transparent";
	}
	else if ((sondaNegraElement.style.left.substring(0,sondaNegraElement.style.left.length-2)) > 626
			&& (sondaNegraElement.style.left.substring(0,sondaNegraElement.style.left.length-2)) < 646
				&& (sondaNegraElement.style.top.substring(0,sondaNegraElement.style.top.length-2)) > 218
					&& (sondaNegraElement.style.top.substring(0,sondaNegraElement.style.top.length-2)) < 248)
	{
		sondaNegraElement.style.left = "639px";
		sondaNegraElement.style.top = "225px";
		console.log("Sonda Negra conectada a fase");
		sondaNegraConectadaARegletaFase1 = false;
		sondaNegraConectadaARegletaFase2 = true;
		document.getElementById('aspaRojaPaso5').style.backgroundImage = "url('./images/aspaVerde.png')";
		document.getElementById('regletaPuenteFase2').style.fill = "transparent";
	}
	else
	{
	console.log("Sonda Negra desconectada");
	document.getElementById('aspaRojaPaso5').style.backgroundImage = "url('./images/aspaRoja.png')";
	sondaNegraConectadaARegletaFase1 = false;
	sondaNegraConectadaARegletaFase2 = false;
	sondaNegraConectadaARegletaNeutro1 = false;
	sondaNegraConectadaARegletaNeutro2 = false;
	
	}

	clearInterval(myVar);
	actualizaReceptor();
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
				&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) > 605
						&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) < 645)
	{
		document.getElementById('conexion10A').style.fill = "rgb(200,200,200,0.2)";
	}
	else if ((conectorRojoElement.style.left.substring(0,conectorRojoElement.style.left.length-2)) > 240
			&& (conectorRojoElement.style.left.substring(0,conectorRojoElement.style.left.length-2)) < 290
				&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) > 605
						&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) < 645)
	{
		document.getElementById('conexionVRA').style.fill = "rgb(200,200,200,0.2)";
	}
	else if ((conectorRojoElement.style.left.substring(0,conectorRojoElement.style.left.length-2)) > 150
			&& (conectorRojoElement.style.left.substring(0,conectorRojoElement.style.left.length-2)) < 200
				&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) > 605
						&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) < 645)
	{
		document.getElementById('conexionCOM').style.fill = "rgb(200,200,200,0.2)";
	}
	else
	{
		document.getElementById('conexion10A').style.fill = "transparent";
		document.getElementById('conexionVRA').style.fill = "transparent";
		document.getElementById('conexionCOM').style.fill = "transparent";
	}	
}

//-----------------------------------------------------------------------------------------------------------------------
function dragEndConectorRojo()
{
	if ((conectorRojoElement.style.left.substring(0,conectorRojoElement.style.left.length-2)) > 60
			&& (conectorRojoElement.style.left.substring(0,conectorRojoElement.style.left.length-2)) < 110
				&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) > 605
						&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) < 645)
	{
		document.getElementById('conexion10A').style.fill = "transparent";
		conectorRojoElement.style.left = "84px";
		conectorRojoElement.style.top = "653px";
		conectorRojoElement.style.backgroundImage = "url('./images/conectorRojoConectado.png')"; 
		conectorRojoElement.style.backgroundRepeat = "no-repeat";
		console.log("Conector Rojo conectado a puerto A10");
		document.getElementById('aspaRojaPaso2').style.backgroundImage = "url('./images/aspaVerde.png')";
		conectorRojoConectadoA10A = true;
		conectorRojoConectadoAVRA = false;
		conectorRojoConectadoACOM = false;
	}
	else if ((conectorRojoElement.style.left.substring(0,conectorRojoElement.style.left.length-2)) > 240
			&& (conectorRojoElement.style.left.substring(0,conectorRojoElement.style.left.length-2)) < 290
				&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) > 605
						&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) < 645)
	{
		document.getElementById('conexionVRA').style.fill = "transparent";
		conectorRojoElement.style.left = "255px";
		conectorRojoElement.style.top = "653px";
		conectorRojoElement.style.backgroundImage = "url('./images/conectorRojoConectado.png')"; 
		conectorRojoElement.style.backgroundRepeat = "no-repeat";
		console.log("Conector Rojo conectado a puerto VRA");
		document.getElementById('aspaRojaPaso2').style.backgroundImage = "url('./images/aspaRoja.png')";
		conectorRojoConectadoA10A = false;
		conectorRojoConectadoAVRA = true;
		conectorRojoConectadoACOM = false;
	}
	else if ((conectorRojoElement.style.left.substring(0,conectorRojoElement.style.left.length-2)) > 140
			&& (conectorRojoElement.style.left.substring(0,conectorRojoElement.style.left.length-2)) < 200
				&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) > 605
						&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) < 645)
	{
		document.getElementById('conexionCOM').style.fill = "transparent";
		conectorRojoElement.style.left = "169px";
		conectorRojoElement.style.top = "653px";
		conectorRojoElement.style.backgroundImage = "url('./images/conectorRojoConectado.png')"; 
		conectorRojoElement.style.backgroundRepeat = "no-repeat";
		console.log("Conector Rojo conectado a puerto COM");
		document.getElementById('aspaRojaPaso2').style.backgroundImage = "url('./images/aspaRoja.png')";
		conectorRojoConectadoA10A = false;
		conectorRojoConectadoAVRA = false;
		conectorRojoConectadoACOM = true;
	}
	else
	{
		console.log("Conector rojo desconectado");
		document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaRoja.png')";
		conectorRojoElement.style.backgroundImage = "url('./images/conectorRojo.png')";
		conectorRojoConectadoA10A = false;
		conectorRojoConectadoAVRA = false;
		conectorRojoConectadoACOM = false;
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
	
	if ((conectorNegroElement.style.left.substring(0,conectorNegroElement.style.left.length-2)) > -10
			&& (conectorNegroElement.style.left.substring(0,conectorNegroElement.style.left.length-2)) < 40
				&& (conectorNegroElement.style.top.substring(0,conectorNegroElement.style.top.length-2)) > 605
					&& (conectorNegroElement.style.top.substring(0,conectorNegroElement.style.top.length-2)) < 645)
	{
		document.getElementById('conexion10A').style.fill = "rgb(200,200,200,0.2)";
	//console.log(conectorNegroElement.style.left);
	//console.log(conectorNegroElement.style.top);

	}
	else if ((conectorNegroElement.style.left.substring(0,conectorNegroElement.style.left.length-2)) > 170
			&& (conectorNegroElement.style.left.substring(0,conectorNegroElement.style.left.length-2)) < 220
				&& (conectorNegroElement.style.top.substring(0,conectorNegroElement.style.top.length-2)) > 605
					&& (conectorNegroElement.style.top.substring(0,conectorNegroElement.style.top.length-2)) < 645)
	{
		document.getElementById('conexionVRA').style.fill = "rgb(200,200,200,0.2)";
	//console.log(conectorNegroElement.style.left);
	//console.log(conectorNegroElement.style.top);

	}
	else if ((conectorNegroElement.style.left.substring(0,conectorNegroElement.style.left.length-2)) > 80
			&& (conectorNegroElement.style.left.substring(0,conectorNegroElement.style.left.length-2)) < 130
				&& (conectorNegroElement.style.top.substring(0,conectorNegroElement.style.top.length-2)) > 605
					&& (conectorNegroElement.style.top.substring(0,conectorNegroElement.style.top.length-2)) < 645)
	{
		document.getElementById('conexionCOM').style.fill = "rgb(200,200,200,0.2)";
	//console.log(conectorNegroElement.style.left);
	//console.log(conectorNegroElement.style.top);

	}
	else
	{
		document.getElementById('conexion10A').style.fill = "transparent";
		document.getElementById('conexionVRA').style.fill = "transparent";
		document.getElementById('conexionCOM').style.fill = "transparent";
	}
}

//-----------------------------------------------------------------------------------------------------------------------
function dragEndConectorNegro()
{
	if ((conectorNegroElement.style.left.substring(0,conectorNegroElement.style.left.length-2)) > -10
			&& (conectorNegroElement.style.left.substring(0,conectorNegroElement.style.left.length-2)) < 40
				&& (conectorNegroElement.style.top.substring(0,conectorNegroElement.style.top.length-2)) > 605
					&& (conectorNegroElement.style.top.substring(0,conectorNegroElement.style.top.length-2)) < 645)
	{
		document.getElementById('conexion10A').style.fill = "transparent";
		conectorNegroElement.style.left = "84px";
		conectorNegroElement.style.top = "653px";
		conectorNegroElement.style.backgroundImage = "url('./images/conectorNegroConectado.png')"; 
		conectorNegroElement.style.backgroundRepeat = "no-repeat";
		console.log("Conector Negro conectado a puerto 10A");
		document.getElementById('aspaRojaPaso1').style.backgroundImage = "url('./images/aspaRoja.png')";
		conectorNegroConectadoA10A = true;
		conectorNegroConectadoAVRA = false;
		conectorNegroConectadoACOM = false;

	}
	else if ((conectorNegroElement.style.left.substring(0,conectorNegroElement.style.left.length-2)) > 170
			&& (conectorNegroElement.style.left.substring(0,conectorNegroElement.style.left.length-2)) < 220
				&& (conectorNegroElement.style.top.substring(0,conectorNegroElement.style.top.length-2)) > 605
					&& (conectorNegroElement.style.top.substring(0,conectorNegroElement.style.top.length-2)) < 645)
	{
		document.getElementById('conexionVRA').style.fill = "transparent";
		conectorNegroElement.style.left = "255px";
		conectorNegroElement.style.top = "653px";
		conectorNegroElement.style.backgroundImage = "url('./images/conectorNegroConectado.png')"; 
		conectorNegroElement.style.backgroundRepeat = "no-repeat";
		console.log("Conector Negro conectado a puerto VRA");
		document.getElementById('aspaRojaPaso1').style.backgroundImage = "url('./images/aspaRoja.png')";
		conectorNegroConectadoA10A = false;
		conectorNegroConectadoAVRA = true;
		conectorNegroConectadoACOM = false;

	}
	else if ((conectorNegroElement.style.left.substring(0,conectorNegroElement.style.left.length-2)) > 80
			&& (conectorNegroElement.style.left.substring(0,conectorNegroElement.style.left.length-2)) < 130
				&& (conectorNegroElement.style.top.substring(0,conectorNegroElement.style.top.length-2)) > 605
					&& (conectorNegroElement.style.top.substring(0,conectorNegroElement.style.top.length-2)) < 645)
	{
		document.getElementById('conexionCOM').style.fill = "transparent";
		conectorNegroElement.style.left = "169px";
		conectorNegroElement.style.top = "653px";
		conectorNegroElement.style.backgroundImage = "url('./images/conectorNegroConectado.png')"; 
		conectorNegroElement.style.backgroundRepeat = "no-repeat";
		console.log("Conector Negro conectado a puerto COM");
		document.getElementById('aspaRojaPaso1').style.backgroundImage = "url('./images/aspaVerde.png')";
		conectorNegroConectadoA10A = false;
		conectorNegroConectadoAVRA = false;
		conectorNegroConectadoACOM = true;
	}
	else
	{
		console.log("Conector negro desconectado");
		document.getElementById('aspaRojaPaso1').style.backgroundImage = "url('./images/aspaRoja.png')";
		conectorNegroConectadoA10A = false;
		conectorNegroConectadoAVRA = true;
		conectorNegroConectadoACOM = false;
		conectorNegroElement.style.backgroundImage = "url('./images/conectorNegro.png')";
	}

	compruebaConexion();
	clearInterval(myVar);
	actualizaVisor();
	removeEventListener("mousemove", dragMoveConectorNegro);
	removeEventListener("mouseup", dragEndConectorNegro);	
}

//----------------------------------------------------------------------------------------------------------------------
//Arrastre puente neutro
function dragStartPuenteNeutro(e)
{
	posicionXPuenteNeutro = e.pageX - puenteNeutroElement.offsetLeft;
	posicionYPuenteNeutro = e.pageY - puenteNeutroElement.offsetTop;	

	puenteNeutroElement.style.backgroundImage = "url('./images/puenteNeutro.png')"; 
	puenteNeutroElement.style.backgroundRepeat = "no-repeat";

	addEventListener("mousemove", dragMovePuenteNeutro);
	addEventListener("mouseup", dragEndPuenteNeutro);
}

//-----------------------------------------------------------------------------------------------------------------------
function dragMovePuenteNeutro(e)
{
	puenteNeutroElement.style.left = (e.pageX - posicionXPuenteNeutro);
	puenteNeutroElement.style.top = (e.pageY - posicionYPuenteNeutro);
	
	if ((puenteNeutroElement.style.left.substring(0,puenteNeutroElement.style.left.length-2)) > 510
			&& (puenteNeutroElement.style.left.substring(0,puenteNeutroElement.style.left.length-2)) < 530
				&& (puenteNeutroElement.style.top.substring(0,puenteNeutroElement.style.top.length-2)) > 208
					&& (puenteNeutroElement.style.top.substring(0,puenteNeutroElement.style.top.length-2)) < 228)
	{
		document.getElementById('regletaPuenteNeutro').style.fill = "rgb(200,200,200,0.2)";
		document.getElementById('regletaPuenteNeutro2').style.fill = "rgb(200,200,200,0.2)";
		puenteNeutroConectadoARegleta = true;
	//console.log(puenteNeutroElement.style.left);
	//console.log(puenteNeutroElement.style.top);

	}
	else
	{
		document.getElementById('regletaPuenteNeutro').style.fill = "transparent";
		document.getElementById('regletaPuenteNeutro2').style.fill = "transparent";
		puenteNeutroConectadoARegleta = false;
	}

	actualizaReceptor();
	actualizaVisor();
}

//-----------------------------------------------------------------------------------------------------------------------

function dragEndPuenteNeutro()
{
	if ((puenteNeutroElement.style.left.substring(0,puenteNeutroElement.style.left.length-2)) > 510
			&& (puenteNeutroElement.style.left.substring(0,puenteNeutroElement.style.left.length-2)) < 530
				&& (puenteNeutroElement.style.top.substring(0,puenteNeutroElement.style.top.length-2)) > 208
					&& (puenteNeutroElement.style.top.substring(0,puenteNeutroElement.style.top.length-2)) < 228)
	{
		document.getElementById('regletaPuenteNeutro').style.fill = "transparent";
		document.getElementById('regletaPuenteNeutro2').style.fill = "transparent";
		puenteNeutroElement.style.left = "519px";
		puenteNeutroElement.style.top = "218px";
		puenteNeutroElement.style.backgroundRepeat = "no-repeat";
		console.log("Puente neutro conectado");
		document.getElementById('aspaRojaPaso4').style.backgroundImage = "url('./images/aspaRoja.png')";
		puenteNeutroConectadoARegleta = true;
	}
	else
	{
		console.log("Puente Neutro desconectado");
		if (puenteFaseConectadoARegleta == false)
			document.getElementById('aspaRojaPaso4').style.backgroundImage = "url('./images/aspaRoja.png')";
		else
			document.getElementById('aspaRojaPaso4').style.backgroundImage = "url('./images/aspaVerde.png')";
		puenteNeutroConectadoARegleta = false;
		puenteNeutroElement.style.backgroundImage = "url('./images/puenteNeutro.png')";
	}
	
	clearInterval(myVar);
	actualizaReceptor();
	actualizaVisor();
	removeEventListener("mousemove", dragMovePuenteNeutro);
	removeEventListener("mouseup", dragEndPuenteNeutro);	
}

//-----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//Arrastre puente fase
function dragStartPuenteFase(e)
{
	posicionXPuenteFase = e.pageX - puenteFaseElement.offsetLeft;
	posicionYPuenteFase = e.pageY - puenteFaseElement.offsetTop;	

	puenteFaseElement.style.backgroundImage = "url('./images/puenteFase.png')"; 
	puenteFaseElement.style.backgroundRepeat = "no-repeat";

	addEventListener("mousemove", dragMovePuenteFase);
	addEventListener("mouseup", dragEndPuenteFase);
}

//-----------------------------------------------------------------------------------------------------------------------
function dragMovePuenteFase(e)
{
	puenteFaseElement.style.left = (e.pageX - posicionXPuenteFase);
	puenteFaseElement.style.top = (e.pageY - posicionYPuenteFase);

	console.log(puenteFaseElement.style.left);
		console.log(puenteFaseElement.style.top);
	
	if ((puenteFaseElement.style.left.substring(0,puenteFaseElement.style.left.length-2)) > 539
			&& (puenteFaseElement.style.left.substring(0,puenteFaseElement.style.left.length-2)) < 559
				&& (puenteFaseElement.style.top.substring(0,puenteFaseElement.style.top.length-2)) > 210
					&& (puenteFaseElement.style.top.substring(0,puenteFaseElement.style.top.length-2)) < 230)
	{
		document.getElementById('regletaPuenteFase').style.fill = "rgb(200,200,200,0.2)";
		document.getElementById('regletaPuenteFase2').style.fill = "rgb(200,200,200,0.2)";
		puenteFaseConectadoARegleta = true;
	}
	else
	{
		document.getElementById('regletaPuenteFase').style.fill = "transparent";
		document.getElementById('regletaPuenteFase2').style.fill = "transparent";
		puenteFaseConectadoARegleta = false;
	}

	actualizaReceptor();
	actualizaVisor();
}

//-----------------------------------------------------------------------------------------------------------------------
function dragEndPuenteFase()
{
	if ((puenteFaseElement.style.left.substring(0,puenteFaseElement.style.left.length-2)) > 539
			&& (puenteFaseElement.style.left.substring(0,puenteFaseElement.style.left.length-2)) < 559
				&& (puenteFaseElement.style.top.substring(0,puenteFaseElement.style.top.length-2)) > 210
					&& (puenteFaseElement.style.top.substring(0,puenteFaseElement.style.top.length-2)) < 230)
	{
		document.getElementById('regletaPuenteFase').style.fill = "transparent";
		document.getElementById('regletaPuenteFase2').style.fill = "transparent";
		puenteFaseElement.style.left = "549px";
		puenteFaseElement.style.top = "220px";
		puenteFaseElement.style.backgroundRepeat = "no-repeat";
		console.log("Puenta fase conectado a la regleta");
		document.getElementById('aspaRojaPaso4').style.backgroundImage = "url('./images/aspaRoja.png')";
		puenteFaseConectadoARegleta = true;

	}
	else
	{
		console.log("Puente fase desconectado");
		if (puenteNeutroConectadoARegleta == false)
			document.getElementById('aspaRojaPaso4').style.backgroundImage = "url('./images/aspaRoja.png')";
		else
			document.getElementById('aspaRojaPaso4').style.backgroundImage = "url('./images/aspaVerde.png')";
		puenteFaseConectadoARegleta = false;
		puenteFaseElement.style.backgroundImage = "url('./images/puenteFase.png')";
	}
	
	compruebaConexion();
	clearInterval(myVar);
	actualizaVisor();
	removeEventListener("mousemove", dragMovePuenteFase);
	removeEventListener("mouseup", dragEndPuenteFase);	
}


//-----------------------------------------------------------------------------------------------------------------------
function actualizaVisor() {
	myVar = setInterval(determinaValor, Math.random()*400);
}

//-----------------------------------------------------------------------------------------------------------------------
function compruebaConexion()
{
	// el circuito lo cierran los puentes
	if (puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true
	&& sondaRojaConectadaARegletaFase1 == false && sondaRojaConectadaARegletaFase2 == false
	&& sondaNegraConectadaARegletaFase1 == false && sondaNegraConectadaARegletaFase2 == false)
	{
		conexionCorrectaParaReceptor = true;
		conexionCorrectaParaMedicion = false;
	}
	else if (
			puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == false
		&& ((sondaRojaConectadaARegletaNeutro1 == true && sondaNegraConectadaARegletaNeutro2 == true)
			|| (sondaRojaConectadaARegletaNeutro2 == true && sondaNegraConectadaARegletaNeutro1 == true))
		&& sondaRojaConectadaARegletaFase1 == false && sondaNegraConectadaARegletaFase2 == false
		&& (((conectorRojoConectadoA10A == true || conectorRojoConectadoAVRA == true) && conectorNegroConectadoACOM == true)
			||  ((conectorNegroConectadoA10A == true || conectorNegroConectadoAVRA == true) && conectorRojoConectadoACOM == true)))
	{

		conexionCorrectaParaReceptor = true;
		conexionCorrectaParaMedicion = true;
	}
	else if (
		puenteFaseConectadoARegleta == false && puenteNeutroConectadoARegleta == true
		&& ((sondaRojaConectadaARegletaFase1 == true && sondaNegraConectadaARegletaFase2 == true)
			|| (sondaRojaConectadaARegletaFase2 == true && sondaNegraConectadaARegletaFase1 == true))
		&& sondaRojaConectadaARegletaNeutro1 == false && sondaNegraConectadaARegletaNeutro2 == false
		&& (((conectorRojoConectadoA10A == true || conectorRojoConectadoAVRA == true) && conectorNegroConectadoACOM == true)
			||  ((conectorNegroConectadoA10A == true || conectorNegroConectadoAVRA == true) && conectorRojoConectadoACOM == true)))
	{
		conexionCorrectaParaReceptor = true;
		conexionCorrectaParaMedicion = true;
	}
	else
	{
		conexionCorrectaParaReceptor = false;
		conexionCorrectaParaMedicion = true;
	}
}

//-----------------------------------------------------------------------------------------------------------------------
function determinaValor()
{
	//clearInterval(myVar);
	
	magnitudMedida = "A";
	tipoMagnitudMedida = "AC";

	switch (indicePosicionSelector)
	{
		case 0:  //console.log("Multímetro apagado");
		case 1:  //console.log("VDC - 200mV");
		case 2:  //console.log("VDC - 2V");
		case 3:  //console.log("VDC - 20V");
		case 4:  //console.log("VDC - 200V");
		case 5:  //console.log("VDC - 1000V");
			configuraValor(0 + Math.random()*4/1000 - 8/10000);
			document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaRoja.png')";
			break;
		case 6:  //console.log("VAC - 750V");
			document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaVerde.png')";
			if (conexionCorrectaParaMedicion == true) configuraValor(VoltajeAC);
			else configuraValor(0);
			break;
		case 7:  //console.log("VAC - 200V");
			representaFueraDeEscala();
			document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaRoja.png')";
			break;
		case 8:  //console.log("VAC - 20V");
			representaFueraDeEscala();
			document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaRoja.png')";
			break;				
		case 9:  //console.log("VAC - 2V");
			representaFueraDeEscala();
			document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaRoja.png')";
			break;				
		case 10: //console.log("hFE");
			break;
		case 11: //console.log("AAC - 2mA");
			document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaRoja.png')";
			if (conexionCorrectaParaMedicion == true && conectorRojoConectadoAVRA == true && estadoFusiblePosicionSelector[13] == "Correcto")
			{
				configuraValor(potenciaReceptor/VoltajeAC);
			}
			break
		case 12: //console.log("AAC - 20mA/10A");
			document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaVerde.png')";
			if (conexionCorrectaParaMedicion == true && conectorRojoConectadoA10A == true && estadoFusiblePosicionSelector[12] == "Correcto")
			{
				configuraValor(potenciaReceptor/VoltajeAC);
			}
			else if (conexionCorrectaParaMedicion == true && conectorRojoConectadoAVRA == true && estadoFusiblePosicionSelector[12] == "Correcto")
			{
				configuraValor(potenciaReceptor/VoltajeAC);
			}
			else if (conexionCorrectaParaMedicion == true && puenteNeutroConectadoARegleta == true && puenteFaseConectadoARegleta == true
				&& (sondaRojaConectadaARegletaNeutro1 == false || sondaRojaConectadaARegletaNeutro2 == false
					|| sondaRojaConectadaARegletaFase1 == false || sondaNegraConectadaARegletaFase2 == false
					|| sondaNegraConectadaARegletaNeutro1 == false || sondaNegraConectadaARegletaNeutro2 == false
					|| sondaNegraConectadaARegletaFase1 == false || sondaNegraConectadaARegletaFase2 == false))
				configuraValor(0);
			else
				configuraValor(0);
			break

		case 13: //console.log("AAC - 200mA");
			document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaRoja.png')";
			if (conexionCorrectaParaMedicion == true && conectorRojoConectadoAVRA == true && estadoFusiblePosicionSelector[13] == "Correcto")
			{
				configuraValor(potenciaReceptor/VoltajeAC);
			}
			break
		case 14: //console.log("ADC - 200mA");
			if (conexionCorrectaParaMedicion == true && estadoFusiblePosicionSelector[14] == "Correcto")
			{
				audioExplosionElement.play();
				estadoFusiblePosicionSelector[14] = "Fundido";
			}
			break
		case 15: //console.log("ADC - 20mA/10A");
			if (conexionCorrectaParaMedicion == true && estadoFusiblePosicionSelector[15] == "Correcto")
			{
				audioExplosionElement.play();
				estadoFusiblePosicionSelector[15] = "Fundido";
			}
			break
		case 16: //console.log("ADC - 2mA");
			if (conexionCorrectaParaMedicion == true && estadoFusiblePosicionSelector[16] == "Correcto")
			{
				audioExplosionElement.play();
				estadoFusiblePosicionSelector[16] = "Fundido";
			}
			break
		case 17: //console.log("ADC - 200uA");
			if (conexionCorrectaParaMedicion == true && estadoFusiblePosicionSelector[17] == "Correcto")
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
			document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaRoja.png')";
		default:
			document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaRoja.png')";
			break;
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