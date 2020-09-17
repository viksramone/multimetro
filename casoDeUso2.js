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

	var estadoFusiblemACorrecto = true;
	var estadoFusible10ACorrecto = true;
	var magnitudAMedir;
	var tipoMagnitudAMedir;
	var magnitudMedida;
	var tipoMagnitudMedida;

	var valorMedido = 0;
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
	/*selectorElement.addEventListener("click", determinaPosicionSelector);
	selectorElement.addEventListener("auxclick", determinaPosicionSelector);*/

	document.getElementById("selector").addEventListener("wheel", determinaPosicionSelector);

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
	var conectorNegroConectadoA10A = false, conectorNegroConectadoAVRA = false, conectorNegroConectadoACOM = false;
	conectorNegroElement.addEventListener("mousedown", dragStartConectorNegro);

	var puenteNeutroElement = document.getElementById('puenteNeutro'), posicionXpuenteNeutro = 0, posicionYpuenteNeutro = 0;
	var puenteNeutroConectadoARegleta = true;
	puenteNeutroElement.addEventListener("mousedown", dragStartPuenteNeutro);

	var puenteFaseElement = document.getElementById('puenteFase'), posicionXpuenteFase = 0, posicionYpuenteFase = 0;
	var puenteFaseConectadoARegleta = true;
	puenteFaseElement.addEventListener("mousedown", dragStartPuenteFase);

	var ultimoValorRepresentadoFueraDeEscala = false;
	var conexionCorrectaParaMedicion = false;
	var conexionCorrectaParaReceptor = true;
	var potenciaReceptor = 0;
	var VoltajeAC = 232;

	var audioExplosionElement = document.getElementById("audioExplosion");
	var audioSecadorElement = document.getElementById("audioSecador");
	var audioCadenaElement = document.getElementById("audioCadena");

	var sondasDesconectadas = true;
	var configuracionMedicionVoltaje = false;
	var configuracionMedicionIntensidadmA = false;
	var configuracionMedicionIntensidad10A = false;
	var configuracionMedicionContinuidad = false;
	var configuracionMedicionResistencia = false;
	
	var conexionDePuntasIncompleta = true;
	var conexionEntreNeutroRegleta1YFaseRegleta1 = false;
	var conexionEntreNeutroRegleta2YFaseRegleta2 = false;
	var conexionEntreNeutroRegleta1YFaseRegleta2 = false;
	var conexionEntreNeutroRegleta2YFaseRegleta1 = false;
	var conexionDeSondasAMismoPunto = false;
	var conexionEntreFaseRegleta1YFaseRegleta2 = false;
	var conexionEntreNeutroRegleta1YNeutroRegleta2 = false;

	var tipoDeMedicion;

//-----------------------------------------------------------------------------------------------------------------------
function actualizaReceptor()
{
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

	analizaTopologia();
	clasificaTipoDeMedicion();
	interpretaMedicionSegunTipo();
	actualizaReceptor();
	//completaPantallaConValor();
	analizaValorParaRepresentarEnPantalla();
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

	analizaTopologia();
	clasificaTipoDeMedicion();
	interpretaMedicionSegunTipo();
	actualizaReceptor();
	//completaPantallaConValor();
	analizaValorParaRepresentarEnPantalla();
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

	analizaTopologia();
	clasificaTipoDeMedicion();
	interpretaMedicionSegunTipo();
	actualizaReceptor();
	//completaPantallaConValor();
	analizaValorParaRepresentarEnPantalla();
}

//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
function determinaPosicionSelector(e)
{
	event.preventDefault();
	console.clear();
	//console.log("button:" + event.button);
	//console.log("which:" + event.which);

	if (indicePosicionSelector == 0 && event.deltaY < 0)
	{
		indicePosicionSelector = 23;
		
		enciende_multimetro();
		console.log("Multímetro encendido");
	}
	
	else if (indicePosicionSelector == 0 && event.deltaY > 0)
	{
		indicePosicionSelector = 1;
		
		enciende_multimetro();
		console.log("Multímetro encendido");
	}
	
	else if (indicePosicionSelector == 23 && event.deltaY > 0)
	{
		indicePosicionSelector = 0;
		apaga_multimetro();
		console.log("Multímetro apagado");
	}
	
	else if (indicePosicionSelector == 1 && event.deltaY < 0)
	{
		indicePosicionSelector = 0;
		apaga_multimetro();
		console.log("Multímetro apagado");
	}
	
	else
	{
		if (indicePosicionSelector <= 23)
		{
			if (event.deltaY < 0)
			{
				indicePosicionSelector = indicePosicionSelector - 1;
			}
			else
			{
				indicePosicionSelector = indicePosicionSelector + 1;
			}
		}
		else 
		{
			console.log("Assert línea 287");
		}
	}


	/*	if (indicePosicionSelector == 0 && event.button == 0)
	{
		indicePosicionSelector = 23;
		
		enciende_multimetro();
		console.log("Multímetro encendido");
	}
	
	else if (indicePosicionSelector == 0 && event.button == 2)
	{
		indicePosicionSelector = 1;
		
		enciende_multimetro();
		console.log("Multímetro encendido");
	}
	
	else if (indicePosicionSelector == 23 && event.button == 2)
	{
		indicePosicionSelector = 0;
		apaga_multimetro();
		console.log("Multímetro apagado");
	}
	
	else if (indicePosicionSelector == 1 && event.button == 0)
	{
		indicePosicionSelector = 0;
		apaga_multimetro();
		console.log("Multímetro apagado");
	}
	
	else
	{
		if (indicePosicionSelector <= 23)
		{
			if (event.button == 0)
			{
				indicePosicionSelector = indicePosicionSelector - 1;
			}
			else
			{
				indicePosicionSelector = indicePosicionSelector + 1;
			}
		}
		else 
		{
			console.log("Assert línea 287");
		}
	}*/

	document.getElementById("selector").src = posicionSelector[indicePosicionSelector];
	console.log("posición del selector:" + indicePosicionSelector);

	if (estadoFusible10ACorrecto == true)
	{
		obtieneCaracteristicasSegunPosicionSelector(); //Magnitud, tipo y rangos
		configuraPantallaSegunPosicionSelector(); //Representa magnitud y tipo
		analizaTopologia();
		clasificaTipoDeMedicion();
		interpretaMedicionSegunTipo();
		actualizaReceptor();
		//completaPantallaConValor();
		analizaValorParaRepresentarEnPantalla();
	}
	else
	{
		multimetroEstropeado();
	}
}

//----------------------------------------------------------------------------------------------------------------------
function apaga_multimetro()
{
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
	document.getElementById("D7S_4b").style.visibility = "hidden";
	document.getElementById("D7S_4c").style.visibility = "hidden";
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
}

//----------------------------------------------------------------------------------------------------------------------
function enciende_multimetro()
{		
	document.getElementById("D7S_1a").style.visibility = "visible";
	document.getElementById("D7S_1b").style.visibility = "visible";
	document.getElementById("D7S_1c").style.visibility = "visible";
	document.getElementById("D7S_1d").style.visibility = "visible";
	document.getElementById("D7S_1e").style.visibility = "visible";
	document.getElementById("D7S_1f").style.visibility = "visible";
	document.getElementById("D7S_1g").style.visibility = "visible";
	document.getElementById("D7S_2a").style.visibility = "visible";
	document.getElementById("D7S_2b").style.visibility = "visible";
	document.getElementById("D7S_2c").style.visibility = "visible";
	document.getElementById("D7S_2d").style.visibility = "visible";
	document.getElementById("D7S_2e").style.visibility = "visible";
	document.getElementById("D7S_2f").style.visibility = "visible";
	document.getElementById("D7S_2g").style.visibility = "visible";
	document.getElementById("D7S_3a").style.visibility = "visible";
	document.getElementById("D7S_3b").style.visibility = "visible";
	document.getElementById("D7S_3c").style.visibility = "visible";
	document.getElementById("D7S_3d").style.visibility = "visible";
	document.getElementById("D7S_3e").style.visibility = "visible";
	document.getElementById("D7S_3f").style.visibility = "visible";
	document.getElementById("D7S_3g").style.visibility = "visible";
	document.getElementById("D7S_4b").style.visibility = "visible";
	document.getElementById("D7S_4c").style.visibility = "visible";
	document.getElementById("signo").style.visibility = "visible";
	document.getElementById("punto1").style.visibility = "visible";
	document.getElementById("punto2").style.visibility = "visible";
	document.getElementById("punto3").style.visibility = "visible";
	document.getElementById("punto4").style.visibility = "visible";
	document.getElementById("ohmios").style.visibility = "visible";
	document.getElementById("kiloohmios").style.visibility = "visible";
	document.getElementById("megaohmios").style.visibility = "visible";
	document.getElementById("voltios").style.visibility = "visible";
	document.getElementById("milivoltios").style.visibility = "visible";
	document.getElementById("hfe").style.visibility = "visible";
	document.getElementById("miliamperios").style.visibility = "visible";
	document.getElementById("microamperios").style.visibility = "visible";
	document.getElementById("AC").style.visibility = "visible";	
}

//-----------------------------------------------------------------------------------------------------------------------
function obtieneCaracteristicasSegunPosicionSelector()
{
	console.log("Obtenemos características de la posición del selector (magnitud, tipo y rango)");

	switch (indicePosicionSelector)
	{

		case 1:  //console.log("VDC - 200mV");
			
			magnitudAMedir = "V";
			tipoMagnitudAMedir = "DC";
			valorMaximo = .1999;
			valorMinimo = -.1999;

			break;

		case 2:  //console.log("VDC - 2V");

			magnitudAMedir = "V";
			tipoMagnitudAMedir = "DC"
			valorMaximo = 1.999;
			valorMinimo = -1.999;		
			
			break;

		case 3:  //console.log("VDC - 20V");
			
			magnitudAMedir = "V";
			tipoMagnitudAMedir = "DC";
			valorMaximo = 19.99;
			valorMinimo = -19.99;

			break;

		case 4:  //console.log("VDC - 200V");
			
			magnitudAMedir = "V";
			tipoMagnitudAMedir = "DC";
			valorMaximo = 199.9;
			valorMinimo = -199.9;

			break;

		case 5:  //console.log("VDC - 1000V");
			
			magnitudAMedir = "V";
			tipoMagnitudAMedir = "DC";
			valorMaximo = 999;
			valorMinimo = -999;

			break;

		case 6:  //console.log("VAC - 750V");
			
			magnitudAMedir = "V";
			tipoMagnitudAMedir = "AC";
			valorMaximo = 749;
			valorMinimo = -749;

			break;

		case 7:  //console.log("VAC - 200V");
			
			magnitudAMedir = "V";
			tipoMagnitudAMedir = "AC";
			valorMaximo = 199.9;
			valorMinimo = -199.9;

			break;

		case 8:  //console.log("VAC - 20V");
			
			magnitudAMedir = "V";
			tipoMagnitudAMedir = "AC";
			valorMaximo = 19.99;
			valorMinimo = -19.99;

			break;

		case 9:  //console.log("VAC - 2V");
			
			magnitudAMedir = "V";
			tipoMagnitudAMedir = "AC";
			valorMaximo = 1.999;
			valorMinimo = -1.999;

			break;

		case 10: //console.log("hFE");
			
			break;
		
		case 11: //console.log("AAC - 2mA");
			
			magnitudAMedir = "A";
			tipoMagnitudAMedir = "AC";
			valorMaximo = .00199;
			valorMinimo = -.001999;

			break;

		case 12: //console.log("AAC - 20mA/10A");
			
			magnitudAMedir = "A";
			tipoMagnitudAMedir = "AC";
			valorMaximo = .0199;
			valorMinimo = -.01999;
			valorMaximo10A = 10.;
			valorMinimo10A = -10.;

			break;

		case 13: //console.log("AAC - 200mA");
			
			magnitudAMedir = "A";
			tipoMagnitudAMedir = "AC";
			valorMaximo = .199;
			valorMinimo = -.1999;
			
			break;

		case 14: //console.log("ADC - 200mA");
			
			magnitudAMedir = "A";
			tipoMagnitudAMedir = "DC";
			valorMaximo = .1999;
			valorMinimo = -.1999;

			break;

		case 15: //console.log("ADC - 20mA/10A");
			
			magnitudAMedir = "A";
			tipoMagnitudAMedir = "DC";
			valorMaximo = .01999;
			valorMinimo = -.01999;

			break;

		case 16: //console.log("ADC - 2mA");
			
			magnitudAMedir = "A";
			tipoMagnitudAMedir = "DC";
			valorMaximo = .00199;
			valorMinimo = -.001999;

			break;

		case 17: //console.log("ADC - 200uA");
			
			magnitudAMedir = "A";
			tipoMagnitudAMedir = "DC";
			valorMaximo = .000199;
			valorMinimo = -.0001999;
			
			break;
		
		case 18: //console.log("Ohm - 200");
			
			magnitudAMedir = "Ohm";
			tipoMagnitudAMedir = null
			valorMaximo = 200;
			valorMinimo = .0;

			break;
		
		case 19: //console.log("Ohm - 2k");
				
			magnitudAMedir = "Ohm";
			tipoMagnitudAMedir = null
			valorMaximo = 2000;
			valorMinimo = .0;

			break;
		
		case 20: //console.log("Ohm - 20k");
				
			magnitudAMedir = "Ohm";
			tipoMagnitudAMedir = null
			valorMaximo = 20000;
			valorMinimo = .0;
			
			break;
		
		case 21: //console.log("Ohm - 200k");
				
			magnitudAMedir = "Ohm";
			tipoMagnitudAMedir = null
			valorMaximo = 200000;
			valorMinimo = .0;
			
			break;
		
		case 22: //console.log("Ohm - 2M");
		
			magnitudAMedir = "Ohm";
			tipoMagnitudAMedir = null
			valorMaximo = 2000000;
			valorMinimo = .0;

			break;
		
		case 23: //console.log("Ohm - 20M");
			
			magnitudAMedir = "Ohm";
			tipoMagnitudAMedir = null
			valorMaximo = 20000000;
			valorMinimo = .0;

			break;

		default:

			break;
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
//var myVar;

//-----------------------------------------------------------------------------------------------------------------------
function analizaValorParaRepresentarEnPantalla()
{

	switch (indicePosicionSelector)
	{
		case 0:  //console.log("Multímetro apagado");
			break;
		case 1:  //console.log("VDC - 200mV");
			if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
				representaValorEnPantalla(valorMedido*10000);
			else
				representaValorEnPantalla(-1);
			break;
		case 2:  //console.log("VDC - 2V");
			if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
				representaValorEnPantalla(valorMedido*1000);
			else
				representaValorEnPantalla(-1);
			break;
		case 3:  //console.log("VDC - 20V");
			if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
				representaValorEnPantalla(valorMedido*100);
			else
				representaValorEnPantalla(-1);
			break;
		case 4:  //console.log("VDC - 200V");
			if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
				representaValorEnPantalla(valorMedido*10);
			else
				representaValorEnPantalla(-1);
			break;
		case 5:  //console.log("VDC - 1000V");
			if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
				representaValorEnPantalla(valorMedido*1);
			else
				representaValorEnPantalla(-1);
			break;
		case 6:  //console.log("VAC - 750V");
			if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
				representaValorEnPantalla(valorMedido*1);
			else
				representaValorEnPantalla(-1);
			break;
		case 7:  //console.log("VAC - 200V");
			if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
				representaValorEnPantalla(valorMedido*10);
			else
				representaValorEnPantalla(-1);
			break;
		case 8:  //console.log("VAC - 20V");
			if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
				representaValorEnPantalla(valorMedido*100);
			else
				representaValorEnPantalla(-1);
			break;
		case 9:  //console.log("VAC - 2V");
			if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
				representaValorEnPantalla(valorMedido*1000);
			else
				representaValorEnPantalla(-1);
			break;
		case 10: //console.log("hFE");
				representaValorEnPantalla(0);
			break;
		case 11: //console.log("AAC - 2mA");
			if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
				representaValorEnPantalla(valorMedido*1000000);
			else
				representaValorEnPantalla(-1);
			break;
		case 12: //console.log("AAC - 20mA/10A");
			if ((conectorRojoConectadoAVRA == true && conectorNegroConectadoACOM == true) || (conectorRojoConectadoACOM == true && conectorNegroConectadoAVRA == true))
			{
				if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
				{
					representaValorEnPantalla(valorMedido*1000000);
				}
				else
				{
					representaValorEnPantalla(-1);
				}
			}
			else if ((conectorRojoConectadoA10A == true && conectorNegroConectadoACOM == true) || (conectorNegroConectadoA10A == true && conectorRojoConectadoACOM == true))
			{
				if (valorMedido <= valorMaximo10A && valorMedido >= valorMinimo10A)
				{
					representaValorEnPantalla(valorMedido*100);
				}
				else
				{
					representaValorEnPantalla(-1);
				}
			}
			else
			{
				representaValorEnPantalla(valorMedido);
			}
			break;
		case 13: //console.log("AAC - 200mA");
			if ((conectorRojoConectadoAVRA == true && conectorNegroConectadoACOM == true)
				|| (conectorNegroConectadoAVRA == true && conectorRojoConectadoACOM == true))
			{
				if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
					representaValorEnPantalla(valorMedido*10000);
				else
					representaValorEnPantalla(-1);
			}
			else if ((conectorRojoConectadoA10A == true && conectorNegroConectadoACOM == true)
				|| (conectorNegroConectadoA10A == true && conectorRojoConectadoACOM == true))
			{
				if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
					representaValorEnPantalla(valorMedido*10000);
				else
					representaValorEnPantalla(-1);
			}
			break;
		case 14: //console.log("ADC - 200mA");
			if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
				representaValorEnPantalla(valorMedido*10000);
			else
				representaValorEnPantalla(-1);
			break;
		case 15: //console.log("ADC - 20mA/10A");
			if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
				representaValorEnPantalla(valorMedido*100000);
			else
				representaValorEnPantalla(-1);
			break;
		case 16: //console.log("ADC - 2mA");
			if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
				representaValorEnPantalla(valorMedido*1000000);
			else
				representaValorEnPantalla(-1);
			break;
		case 17: //console.log("ADC - 200uA");
			if (valorMedido <= valorMaximo && valorMedido >= valorMinimo)
				representaValorEnPantalla(valorMedido*10000000);
			else
				representaValorEnPantalla(-1);
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
function configuraPantallaSegunPosicionSelector()
{
	switch (indicePosicionSelector)
	{
		case 1:  //console.log("VDC - 200mV");
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#141414";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#141414";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";	
			break;

		case 2:  //console.log("VDC - 2V");
			document.getElementById("punto1").style.fill = "#141414";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#808080";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#141414";
			document.getElementById("milivoltios").style.color = "#808080";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";				
			break;

		case 3:  //console.log("VDC - 20V");
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#141414";
			document.getElementById("punto3").style.fill = "#808080";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#141414";
			document.getElementById("milivoltios").style.color = "#808080";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";				
			break;

		case 4:  //console.log("VDC - 200V");
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#141414";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#141414";
			document.getElementById("milivoltios").style.color = "#808080";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";	
			break;

		case 5:  //console.log("VDC - 1000V");
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#808080";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#141414";
			document.getElementById("milivoltios").style.color = "#808080";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";	
			break;

		case 6:  //console.log("VAC - 750V");
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#808080";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#141414";
			document.getElementById("milivoltios").style.color = "#808080";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#141414";	
			break;

		case 7:  //console.log("VAC - 200V");
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#141414";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#141414";
			document.getElementById("milivoltios").style.color = "#808080";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#141414";	
			break;

		case 8:  //console.log("VAC - 20V");
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#141414";
			document.getElementById("punto3").style.fill = "#808080";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#141414";
			document.getElementById("milivoltios").style.color = "#808080";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#141414";	
			break;

		case 9:  //console.log("VAC - 2V");
			document.getElementById("punto1").style.fill = "#141414";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#808080";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#141414";
			document.getElementById("milivoltios").style.color = "#808080";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#141414";	
			break;

		case 10: //console.log("hFE");
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#808080";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#808080";
			document.getElementById("hfe").style.color = "#141414";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";	
			break;
		
		case 11: //console.log("AAC - 2mA");
			document.getElementById("punto1").style.fill = "#141414";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#808080";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#808080";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#141414";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#141414";	
			break;

		case 12: //console.log("AAC - 20mA/10A");
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#141414";
			document.getElementById("punto3").style.fill = "#808080";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#808080";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#141414";	
			break;

		case 13: //console.log("AAC - 200mA");
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#141414";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#808080";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#141414";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#141414";			
			break;

		case 14: //console.log("ADC - 200mA");
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#141414";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#808080";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#141414";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";		
			break;

		case 15: //console.log("ADC - 20mA/10A");
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#141414";
			document.getElementById("punto3").style.fill = "#808080";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#808080";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#141414";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";		
			break;

		case 16: //console.log("ADC - 2mA");
			document.getElementById("punto1").style.fill = "#141414";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#808080";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#808080";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#141414";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";	
			break;

		case 17: //console.log("ADC - 200uA");
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#141414";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#808080";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#141414";
			document.getElementById("AC").style.color = "#808080";					
			break;
		
		case 18: //console.log("Ohm - 200");
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#141414";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#141414";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#808080";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";		
			break;
		
		case 19: //console.log("Ohm - 2k");
			document.getElementById("punto1").style.fill = "#141414";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#808080";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#141414";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#808080";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";	
			break;
		
		case 20: //console.log("Ohm - 20k");
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#141414";
			document.getElementById("punto3").style.fill = "#808080";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#141414";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#808080";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";	
			break;
		
		case 21: //console.log("Ohm - 200k");
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#141414";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#141414";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#808080";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";	
			break;
		
		case 22: //console.log("Ohm - 2M");
			document.getElementById("punto1").style.fill = "#141414";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#808080";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#141414";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#808080";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";		
			break;
		
		case 23: //console.log("Ohm - 20M");
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#141414";
			document.getElementById("punto3").style.fill = "#808080";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#141414";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#808080";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";		
			break;

		default:
			break;
	}
}

//-----------------------------------------------------------------------------------------------------------------------
function representaValorEnPantalla(valorARepresentar)
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


	if (valorARepresentar == -1)
	{
		representaFueraDeEscala();
		ultimoValorRepresentadoFueraDeEscala = true;
	}
	else
	{
		if (ultimoValorRepresentadoFueraDeEscala == true)
		{
			configuraPantallaSegunPosicionSelector(); //Representa magnitud y tipo
		}	

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
			document.getElementById("D7S_2a").style.fill = "#141414";
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
}

//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
//Arrastre sonda roja
//-----------------------------------------------------------------------------------------------------------------------
function dragStartSondaRoja(e)
{
	console.log("Seleccionamos sonda roja");

	posicionXSondaRoja = e.pageX - sondaRojaElement.offsetLeft;
	posicionYSondaRoja = e.pageY - sondaRojaElement.offsetTop;	
	
	addEventListener("mousemove", dragMoveSondaRoja);
	addEventListener("mouseup", dragEndSondaRoja);
}
//-----------------------------------------------------------------------------------------------------------------------
function dragMoveSondaRoja(e)
{
	console.log("Desplazamos sonda roja");

	sondaRojaElement.style.left = (e.pageX - posicionXSondaRoja);
	sondaRojaElement.style.top = (e.pageY - posicionYSondaRoja);

	if ((sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) > 485
			&& (sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) < 505
				&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) > 210
					&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) < 240)
	{
		document.getElementById('regletaPuenteNeutro').style.fill = "rgb(200,200,200,1)";
		sondaRojaConectadaARegletaNeutro1 = true;
		//analizaTopologia();
	}
	else if ((sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) > 656
			&& (sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) < 676
				&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) > 221
					&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) < 251)
	{
		document.getElementById('regletaPuenteNeutro2').style.fill = "rgb(200,200,200,1)";
		sondaRojaConectadaARegletaNeutro2 = true;
		//analizaTopologia();
	}
	else if ((sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) > 516
			&& (sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) < 536
				&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) > 213
					&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) < 243)
	{
		document.getElementById('regletaPuenteFase').style.fill = "rgb(200,200,200,1)";
		sondaRojaConectadaARegletaFase1 = true;
		//analizaTopologia();
	}
	else if ((sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) > 626
			&& (sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) < 646
				&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) > 218
					&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) < 248)
	{
		document.getElementById('regletaPuenteFase2').style.fill = "rgb(200,200,200,1)";
		sondaRojaConectadaARegletaFase2 = true;
		//analizaTopologia();
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

	if (estadoFusible10ACorrecto == true)
	{
		analizaTopologia();
		clasificaTipoDeMedicion();
		interpretaMedicionSegunTipo();
		actualizaReceptor();
		//completaPantallaConValor();
		analizaValorParaRepresentarEnPantalla();
	}
	
}
//-----------------------------------------------------------------------------------------------------------------------
function dragEndSondaRoja(e) 

{
	console.log("Liberamos sonda roja");

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
		document.getElementById('aspaRojaPaso6').style.backgroundImage = "url('./images/aspaVerde.png')";
		document.getElementById('regletaPuenteNeutro2').style.fill = "transparent";
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

	//clearInterval(myVar);
	if (estadoFusible10ACorrecto == true)
	{
		analizaTopologia();
		clasificaTipoDeMedicion();
		interpretaMedicionSegunTipo();
		actualizaReceptor();
		//completaPantallaConValor();
		analizaValorParaRepresentarEnPantalla();
	}
	
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
	console.log("Seleccionamos sonda negra");
	posicionXSondaNegra = e.pageX - sondaNegraElement.offsetLeft;
	posicionYSondaNegra = e.pageY - sondaNegraElement.offsetTop;	
	addEventListener("mousemove", dragMoveSondaNegra);
	addEventListener("mouseup", dragEndSondaNegra);
}

//-----------------------------------------------------------------------------------------------------------------------
function dragMoveSondaNegra(e)
{
	console.log("Desplazamos sonda negra");
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

	if (estadoFusible10ACorrecto == true)
	{
		analizaTopologia();
		clasificaTipoDeMedicion();
		interpretaMedicionSegunTipo();
		actualizaReceptor();
		//completaPantallaConValor();
		analizaValorParaRepresentarEnPantalla();
	}
}

//-----------------------------------------------------------------------------------------------------------------------
function dragEndSondaNegra()
{
	console.log("Liberamos sonda negra");
	
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

	//clearInterval(myVar);
	if (estadoFusible10ACorrecto == true)
	{
		analizaTopologia();
		clasificaTipoDeMedicion();
		interpretaMedicionSegunTipo();
		actualizaReceptor();
		//completaPantallaConValor();
		analizaValorParaRepresentarEnPantalla();
	}
	
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
	console.log("Seleccionamos conector rojo");

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
	console.log("Desplazamos conector rojo");

	conectorRojoElement.style.left = (e.pageX - posicionXConectorRojo);
	conectorRojoElement.style.top = (e.pageY - posicionYConectorRojo);

	if ((conectorRojoElement.style.left.substring(0,conectorRojoElement.style.left.length-2)) > 60
			&& (conectorRojoElement.style.left.substring(0,conectorRojoElement.style.left.length-2)) < 110
				&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) > 605
						&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) < 645)
	{
		document.getElementById('conexion10A').style.fill = "rgb(200,200,200,0.2)";
		conectorRojoConectadoA10A = true;
	}
	else if ((conectorRojoElement.style.left.substring(0,conectorRojoElement.style.left.length-2)) > 240
			&& (conectorRojoElement.style.left.substring(0,conectorRojoElement.style.left.length-2)) < 290
				&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) > 605
						&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) < 645)
	{
		document.getElementById('conexionVRA').style.fill = "rgb(200,200,200,0.2)";
		conectorRojoConectadoAVRA = true;
	}
	else if ((conectorRojoElement.style.left.substring(0,conectorRojoElement.style.left.length-2)) > 150
			&& (conectorRojoElement.style.left.substring(0,conectorRojoElement.style.left.length-2)) < 200
				&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) > 605
						&& (conectorRojoElement.style.top.substring(0,conectorRojoElement.style.top.length-2)) < 645)
	{
		document.getElementById('conexionCOM').style.fill = "rgb(200,200,200,0.2)";
		conectorRojoConectadoACOM = true;
	}
	else
	{
		document.getElementById('conexion10A').style.fill = "transparent";
		document.getElementById('conexionVRA').style.fill = "transparent";
		document.getElementById('conexionCOM').style.fill = "transparent";
		conectorRojoConectadoA10A = false;
		conectorRojoConectadoAVRA = false;
		conectorRojoConectadoACOM = false;
	}	

	if (estadoFusible10ACorrecto == true)
	{
		analizaTopologia();
		clasificaTipoDeMedicion();
		interpretaMedicionSegunTipo();
		actualizaReceptor();
		//completaPantallaConValor();
		analizaValorParaRepresentarEnPantalla();
	}
}

//-----------------------------------------------------------------------------------------------------------------------
function dragEndConectorRojo()
{
	console.log("Liberamos conector rojo");

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

	//clearInterval(myVar);
	if (estadoFusible10ACorrecto == true)
	{
		analizaTopologia();
		clasificaTipoDeMedicion();
		interpretaMedicionSegunTipo();
		actualizaReceptor();
		//completaPantallaConValor();
		analizaValorParaRepresentarEnPantalla();
	}
	removeEventListener("mousemove", dragMoveConectorRojo);
	removeEventListener("mouseup", dragEndConectorRojo);	
}

//-----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//Arrastre conector negro
function dragStartConectorNegro(e)
{
	console.log("Seleccionamos conector negro");

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
	console.log("Desplazamos conector negro");

	conectorNegroElement.style.left = (e.pageX - posicionXConectorNegro);
	conectorNegroElement.style.top = (e.pageY - posicionYConectorNegro);
	
	if ((conectorNegroElement.style.left.substring(0,conectorNegroElement.style.left.length-2)) > -10
			&& (conectorNegroElement.style.left.substring(0,conectorNegroElement.style.left.length-2)) < 40
				&& (conectorNegroElement.style.top.substring(0,conectorNegroElement.style.top.length-2)) > 605
					&& (conectorNegroElement.style.top.substring(0,conectorNegroElement.style.top.length-2)) < 645)
	{
		document.getElementById('conexion10A').style.fill = "rgb(200,200,200,0.2)";
		conectorNegroConectadoA10A = true;

	//console.log(conectorNegroElement.style.left);
	//console.log(conectorNegroElement.style.top);

	}
	else if ((conectorNegroElement.style.left.substring(0,conectorNegroElement.style.left.length-2)) > 170
			&& (conectorNegroElement.style.left.substring(0,conectorNegroElement.style.left.length-2)) < 220
				&& (conectorNegroElement.style.top.substring(0,conectorNegroElement.style.top.length-2)) > 605
					&& (conectorNegroElement.style.top.substring(0,conectorNegroElement.style.top.length-2)) < 645)
	{
		document.getElementById('conexionVRA').style.fill = "rgb(200,200,200,0.2)";
		conectorNegroConectadoAVRA = true;

	//console.log(conectorNegroElement.style.left);
	//console.log(conectorNegroElement.style.top);

	}
	else if ((conectorNegroElement.style.left.substring(0,conectorNegroElement.style.left.length-2)) > 80
			&& (conectorNegroElement.style.left.substring(0,conectorNegroElement.style.left.length-2)) < 130
				&& (conectorNegroElement.style.top.substring(0,conectorNegroElement.style.top.length-2)) > 605
					&& (conectorNegroElement.style.top.substring(0,conectorNegroElement.style.top.length-2)) < 645)
	{
		document.getElementById('conexionCOM').style.fill = "rgb(200,200,200,0.2)";
		conectorNegroConectadoACOM = true;

	//console.log(conectorNegroElement.style.left);
	//console.log(conectorNegroElement.style.top);

	}
	else
	{
		document.getElementById('conexion10A').style.fill = "transparent";
		document.getElementById('conexionVRA').style.fill = "transparent";
		document.getElementById('conexionCOM').style.fill = "transparent";
		conectorNegroConectadoA10A = false;
		conectorNegroConectadoAVRA = false;
		conectorNegroConectadoACOM = false;
	}

	if (estadoFusible10ACorrecto == true)
	{
		analizaTopologia();
		clasificaTipoDeMedicion();
		interpretaMedicionSegunTipo();
		actualizaReceptor();
		//completaPantallaConValor();
		analizaValorParaRepresentarEnPantalla();
	}
}

//-----------------------------------------------------------------------------------------------------------------------
function dragEndConectorNegro()
{
	console.log("Liberamos conector negro");

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
		conectorNegroConectadoAVRA = false;
		conectorNegroConectadoACOM = false;
		conectorNegroElement.style.backgroundImage = "url('./images/conectorNegro.png')";
	}

	//clearInterval(myVar);
	if (estadoFusible10ACorrecto == true)
	{
		analizaTopologia();
		clasificaTipoDeMedicion();
		interpretaMedicionSegunTipo();
		actualizaReceptor();
		//completaPantallaConValor();
		analizaValorParaRepresentarEnPantalla();
	}

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

	if (estadoFusible10ACorrecto == true)
	{
		analizaTopologia();
		clasificaTipoDeMedicion();
		interpretaMedicionSegunTipo();
		actualizaReceptor();
		//completaPantallaConValor();
		analizaValorParaRepresentarEnPantalla();
	}
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
		if 	(puenteFaseConectadoARegleta == true)
			document.getElementById('aspaRojaPaso4').style.backgroundImage = "url('./images/aspaRoja.png')";
		else
			document.getElementById('aspaRojaPaso4').style.backgroundImage = "url('./images/aspaVerde.png')";
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
	
	//clearInterval(myVar);
	if (estadoFusible10ACorrecto == true)
	{
		analizaTopologia();
		clasificaTipoDeMedicion();
		interpretaMedicionSegunTipo();
		actualizaReceptor();
		//completaPantallaConValor();
		analizaValorParaRepresentarEnPantalla();
	}

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

	if (estadoFusible10ACorrecto == true)
	{
		analizaTopologia();
		clasificaTipoDeMedicion();
		interpretaMedicionSegunTipo();
		actualizaReceptor();
		//completaPantallaConValor();
		analizaValorParaRepresentarEnPantalla();
	}
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
		if (puenteNeutroConectadoARegleta == true)
			document.getElementById('aspaRojaPaso4').style.backgroundImage = "url('./images/aspaRoja.png')";
		else
			document.getElementById('aspaRojaPaso4').style.backgroundImage = "url('./images/aspaVerde.png')";
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
	
	//clearInterval(myVar);
	if (estadoFusible10ACorrecto == true)
	{
		analizaTopologia();
		clasificaTipoDeMedicion();
		interpretaMedicionSegunTipo();
		actualizaReceptor();
		//completaPantallaConValor();
		analizaValorParaRepresentarEnPantalla();
	}

	removeEventListener("mousemove", dragMovePuenteFase);
	removeEventListener("mouseup", dragEndPuenteFase);	
}

//-----------------------------------------------------------------------------------------------------------------------
var variableParasetInterval;

//-----------------------------------------------------------------------------------------------------------------------
function generaRuidoBlanco()
{
	if ((conectorRojoConectadoAVRA == true && conectorNegroConectadoACOM == true)
		|| (conectorNegroConectadoAVRA == true && conectorRojoConectadoACOM == true))
	{
		valorMedido = 3/1000 + Math.random()*4/1000 - 2/1000;
	}
	else
	{
		valorMedido = 0 + Math.random()*4/1000 - 2/1000;
	}
					
	analizaValorParaRepresentarEnPantalla();
}
//-----------------------------------------------------------------------------------------------------------------------
/*function completaPantallaConValor() {
	
	var valorMedido;

	if (sondasDesconectadas == true || conexionDePuntasIncompleta == true)
	{
		switch (indicePosicionSelector)
		{
			case 1: 
			case 2:
			case 3:
			case 4:
			case 5:
				console.log("Al no haber conexión valida simulamos valores de ruido.");

				if (variableParasetInterval)
				{}
				else
					variableParasetInterval = setInterval(generaRuidoBlanco, 400);
				break
			default:
				clearInterval(variableParasetInterval);	
				variableParasetInterval = undefined;
				analizaValorParaRepresentarEnPantalla(0);
				break;
		}
	}
	else
	{
		clearInterval(variableParasetInterval);	
		variableParasetInterval = undefined;
		valorMedido = interpretaMedicionSegunTipo();
		analizaValorParaRepresentarEnPantalla(valorMedido);
	}
		//clearInterval(myVar);
	//myVar = setInterval(determinaValor, 500);
	//myVar = setInterval(determinaValor, Math.random()*400);
	//determinaValor();
}
*/
//-----------------------------------------------------------------------------------------------------------------------
function analizaTopologia()
{
	analizaConexionDeBornes();
	analizaConexionDePuntas();
	analizaConexionDePuentes();
	//clasificaTipoDeMedicion();
	//interpretaMedicionSegunTipo();
}
//-----------------------------------------------------------------------------------------------------------------------
function analizaConexionDeBornes()	//Conexión de bornes (configuración del multímetro)
{		 
	console.log("Analiza la conexiones de los bornes");

	if (conectorRojoConectadoAVRA == false && conectorNegroConectadoAVRA == false 
		&& conectorRojoConectadoACOM == false && conectorNegroConectadoACOM == false
		&& conectorRojoConectadoA10A == false && conectorNegroConectadoA10A == false)
	{
		console.log("Sondas desconectadas");
		sondasDesconectadas = true;

		configuracionMedicionVoltaje = false;
		configuracionMedicionIntensidadmA = false;
		configuracionMedicionIntensidad10A = false;
		configuracionMedicionContinuidad = false;
		configuracionMedicionResistencia = false;
	}	
	
	else if ((conectorRojoConectadoAVRA == true && conectorNegroConectadoACOM)
			|| (conectorNegroConectadoAVRA == true && conectorRojoConectadoACOM))
	{
		console.log("Sondas conectadas para medir voltajes DC/AC, intensidades de mA en DC/AC, continuidad y resistencia");
		sondasDesconectadas = false;

		configuracionMedicionVoltaje = true;
		configuracionMedicionIntensidadmA = true;
		configuracionMedicionIntensidad10A = false;
		configuracionMedicionContinuidad = true;
		configuracionMedicionResistencia = true;

	}
	else if ((conectorRojoConectadoA10A == true && conectorNegroConectadoACOM)
			|| (conectorNegroConectadoA10A == true && conectorRojoConectadoACOM))
	{
		console.log("Sondas conectadas para medir voltajes DC/AC, intensidades de mA en DC/AC, continuidad y resistencia");
		sondasDesconectadas = false;
		
		configuracionMedicionVoltaje = false;
		configuracionMedicionIntensidadmA = false;
		configuracionMedicionIntensidad10A = true;
		configuracionMedicionContinuidad = false;
		configuracionMedicionResistencia = false;
	}
	else
	{
		console.log("Configuración de sondas incompleta");
	}
}
//-----------------------------------------------------------------------------------------------------------------------
function analizaConexionDePuntas()
{
	console.log("Analiza la conexiones de las puntas");

	if ((sondaRojaConectadaARegletaNeutro1 == false && sondaRojaConectadaARegletaNeutro2 == false
		&& sondaRojaConectadaARegletaFase1 == false && sondaRojaConectadaARegletaFase2 == false)
		|| (sondaNegraConectadaARegletaNeutro1 == false && sondaNegraConectadaARegletaNeutro2 == false
		&& sondaNegraConectadaARegletaFase1 == false && sondaNegraConectadaARegletaFase2 == false))
	{
		console.log("Hay alguna punta desconectada");
		conexionDePuntasIncompleta = true;
	
		conexionEntreNeutroRegleta1YFaseRegleta1 = false;
		conexionEntreNeutroRegleta2YFaseRegleta2 = false;
		conexionEntreNeutroRegleta1YFaseRegleta2 = false;
		conexionEntreNeutroRegleta2YFaseRegleta1 = false;
		conexionDeSondasAMismoPunto == false;
		conexionEntreFaseRegleta1YFaseRegleta2 = false;
		conexionEntreNeutroRegleta1YNeutroRegleta2 = false;
	}

	else if ((sondaRojaConectadaARegletaNeutro1 == true && sondaNegraConectadaARegletaFase1 == true)
			|| (sondaNegraConectadaARegletaNeutro1 == true && sondaRojaConectadaARegletaFase1 == true))
	{
		console.log("Conexión entre Neutro y Fase");
		console.log("Las puntas están conectadas entre Neutro y Fase de la regleta 1");
		conexionEntreNeutroRegleta1YFaseRegleta1 = true;
	
		conexionDePuntasIncompleta = false;
		conexionEntreNeutroRegleta2YFaseRegleta2 = false;
		conexionEntreNeutroRegleta1YFaseRegleta2 = false;
		conexionEntreNeutroRegleta2YFaseRegleta1 = false;
		conexionDeSondasAMismoPunto == false;
		conexionEntreFaseRegleta1YFaseRegleta2 = false;
		conexionEntreNeutroRegleta1YNeutroRegleta2 = false;
	}
	
	else if ((sondaRojaConectadaARegletaNeutro2 == true && sondaNegraConectadaARegletaFase2 == true)
			|| (sondaNegraConectadaARegletaNeutro2 == true && sondaRojaConectadaARegletaFase2 == true))
	{
		console.log("Conexión entre Neutro y Fase");
		console.log("Las puntas están conectadas entre Neutro y Fase de la regleta 2");
		conexionEntreNeutroRegleta2YFaseRegleta2 = true;
	
		conexionDePuntasIncompleta = false;
		conexionEntreNeutroRegleta1YFaseRegleta1 = false;
		conexionEntreNeutroRegleta1YFaseRegleta2 = false;
		conexionEntreNeutroRegleta2YFaseRegleta1 = false;
		conexionDeSondasAMismoPunto == false;
		conexionEntreFaseRegleta1YFaseRegleta2 = false;
		conexionEntreNeutroRegleta1YNeutroRegleta2 = false;
	}

	else if ((sondaRojaConectadaARegletaNeutro1 == true && sondaNegraConectadaARegletaFase2 == true)
		|| (sondaNegraConectadaARegletaNeutro1 == true && sondaRojaConectadaARegletaFase2 == true))
	{
		console.log("Conexión entre Neutro y Fase");
		console.log("Las puntas están conectadas entre Neutro de la regleta 1 y Fase de la regleta 2");
		conexionEntreNeutroRegleta1YFaseRegleta2 = true;
		
		conexionDePuntasIncompleta = false;
		conexionEntreNeutroRegleta1YFaseRegleta1 = false;
		conexionEntreNeutroRegleta2YFaseRegleta2 = false;
		conexionEntreNeutroRegleta2YFaseRegleta1 = false;
		conexionDeSondasAMismoPunto == false;
		conexionEntreFaseRegleta1YFaseRegleta2 = false;
		conexionEntreNeutroRegleta1YNeutroRegleta2 = false;
	}
	
	else if ((sondaRojaConectadaARegletaNeutro2 == true && sondaNegraConectadaARegletaFase1 == true)
			|| (sondaNegraConectadaARegletaNeutro2 == true && sondaRojaConectadaARegletaFase1 == true))
	{
		console.log("Conexión entre Neutro y Fase");
		console.log("Las puntas están conectadas entre Neutro de la regleta 2 y Fase de la regleta 1");
		conexionEntreNeutroRegleta2YFaseRegleta1 = true;
	
		conexionDePuntasIncompleta = false;
		conexionEntreNeutroRegleta1YFaseRegleta1 = false;
		conexionEntreNeutroRegleta2YFaseRegleta2 = false;
		conexionEntreNeutroRegleta1YFaseRegleta2 = false;
		conexionDeSondasAMismoPunto == false;
		conexionEntreFaseRegleta1YFaseRegleta2 = false;
		conexionEntreNeutroRegleta1YNeutroRegleta2 = false;
	}

	else if ((sondaRojaConectadaARegletaFase1 == true && sondaNegraConectadaARegletaFase1 == true)
			|| (sondaRojaConectadaARegletaFase2 == true && sondaNegraConectadaARegletaFase2 == true)
			|| (sondaRojaConectadaARegletaNeutro1 == true && sondaNegraConectadaARegletaNeutro1 == true)
			|| (sondaRojaConectadaARegletaNeutro2 == true && sondaNegraConectadaARegletaNeutro2 == true))
	{
		console.log("Las puntas están conectadas a un mismo punto");
		conexionDeSondasAMismoPunto == true
	
		conexionDePuntasIncompleta = false;
		conexionEntreNeutroRegleta1YFaseRegleta1 = false;
		conexionEntreNeutroRegleta2YFaseRegleta2 = false;
		conexionEntreNeutroRegleta1YFaseRegleta2 = false;
		conexionEntreNeutroRegleta2YFaseRegleta1 = false;
		conexionEntreFaseRegleta1YFaseRegleta2 = false;
		conexionEntreNeutroRegleta1YNeutroRegleta2 = false;
	}

	else if ((sondaRojaConectadaARegletaFase1 == true && sondaNegraConectadaARegletaFase2 == true)
			|| (sondaRojaConectadaARegletaFase2 == true && sondaNegraConectadaARegletaFase1 == true))
	{
		console.log("Las puntas están conectadas entre Fases");
		console.log("Las puntas están conectadas entre las fases de las regleta 1 y 2");
		conexionEntreFaseRegleta1YFaseRegleta2 = true;

		conexionDePuntasIncompleta = false;
		conexionEntreNeutroRegleta1YFaseRegleta1 = false;
		conexionEntreNeutroRegleta2YFaseRegleta2 = false;
		conexionEntreNeutroRegleta1YFaseRegleta2 = false;
		conexionEntreNeutroRegleta2YFaseRegleta1 = false;
		conexionDeSondasAMismoPunto == false;
		conexionEntreNeutroRegleta1YNeutroRegleta2 = false;
	}

	else if ((sondaRojaConectadaARegletaNeutro1 == true && sondaNegraConectadaARegletaNeutro2 == true)
			|| (sondaRojaConectadaARegletaNeutro2 == true && sondaNegraConectadaARegletaNeutro1 == true))
	{
		console.log("Las puntas están conectadas entre Neutros");
		console.log("Las puntas están conectadas entre los neutros de las regletas 1 y 2");
		conexionEntreNeutroRegleta1YNeutroRegleta2 = true;
	
		conexionDePuntasIncompleta = false;
		conexionEntreNeutroRegleta1YFaseRegleta1 = false;
		conexionEntreNeutroRegleta2YFaseRegleta2 = false;
		conexionEntreNeutroRegleta1YFaseRegleta2 = false;
		conexionEntreNeutroRegleta2YFaseRegleta1 = false;
		conexionDeSondasAMismoPunto == false;
		conexionEntreFaseRegleta1YFaseRegleta2 = false;
	}

	else
	{
		console.log("Conexión de puntas desconocida");
	}

}

//-----------------------------------------------------------------------------------------------------------------------
function analizaConexionDePuentes()
{
	console.log("Analiza la conexiones de los puentes");
	
	if (puenteFaseConectadoARegleta == true)
	{
		console.log("El puente de fase está conectado");
	}
	else
	{
		console.log("El puente de fase está desconectado");	
	}

	if (puenteNeutroConectadoARegleta == true)
	{
		console.log("El puente de neutro está conectado");
	}
	else
	{
		console.log("El puente de neutro está desconectado");	
	}
}

//-----------------------------------------------------------------------------------------------------------------------
function analizaEstadoDelReceptor()
{

}


//-----------------------------------------------------------------------------------------------------------------------
function clasificaTipoDeMedicion()
{	
	
	switch (indicePosicionSelector)
	{
		case 0: 

			if (puenteNeutroConectadoARegleta == true && puenteFaseConectadoARegleta == true)
			{
				conexionCorrectaParaReceptor = true;
			}
			else
			{
				conexionCorrectaParaReceptor = false;
			}
			break;

		case 1: case 2: case 3: case 4: case 5:
			
			console.log("Medimos voltaje DC en caso de uso AC.");
			if (sondasDesconectadas == true)
			{
				tipoDeMedicion = 'MEDICION_INCORRECTA_RUIDO_BLANCO';
				
				clearInterval(oscilacionValorMedido);
				clearInterval(oscilacionValorMedidoIntensidadmA);
				clearInterval(oscilacionValorMedidoIntensidad10A);

				if (puenteNeutroConectadoARegleta == true && puenteFaseConectadoARegleta == true)
				{
					conexionCorrectaParaReceptor = true;
				}
				else
				{
					conexionCorrectaParaReceptor = false;
				}
			}
			
			else if (sondasDesconectadas == false && configuracionMedicionVoltaje == true && conexionDePuntasIncompleta == true)
			{
				tipoDeMedicion = 'MEDICION_INCORRECTA_RUIDO_BLANCO';
				
				clearInterval(oscilacionValorMedido);
				clearInterval(oscilacionValorMedidoIntensidadmA);
				clearInterval(oscilacionValorMedidoIntensidad10A);

				if (puenteNeutroConectadoARegleta == true && puenteFaseConectadoARegleta == true)
				{
					conexionCorrectaParaReceptor = true;
				}
				else
				{
					conexionCorrectaParaReceptor = false;
				}
			}
			
			else if (sondasDesconectadas == false && configuracionMedicionIntensidad10A == true && conexionDePuntasIncompleta == true)
			{
				tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
				
				clearInterval(oscilacionValorMedido);
				clearInterval(oscilacionValorMedidoIntensidadmA);
				clearInterval(oscilacionValorMedidoIntensidad10A);

				if (puenteNeutroConectadoARegleta == true && puenteFaseConectadoARegleta == true)
				{
					conexionCorrectaParaReceptor = true;
				}
				else
				{
					conexionCorrectaParaReceptor = false;
				}
			}

			else if (sondasDesconectadas == false && configuracionMedicionVoltaje == true && conexionDePuntasIncompleta == false)
			{
				if ((conexionEntreNeutroRegleta1YFaseRegleta1 == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta2 == true && puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
					|| (conexionEntreNeutroRegleta1YFaseRegleta2 == true && puenteFaseConectadoARegleta == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta1 == true && puenteNeutroConectadoARegleta == true))
				{
					console.log("Sondas conectadas y puntas entre Fase y Neutro");
					tipoDeMedicion = "VOLTAJE_DC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AC";
				}
				else if (conexionEntreNeutroRegleta2YFaseRegleta2 == true && (puenteFaseConectadoARegleta == false || puenteNeutroConectadoARegleta == false))
				{
					console.log("Sondas conectadas y puntas entre Fase y Neutro en la regleta 2, con los puentes desconectados");
					tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
				}
				else if (conexionEntreFaseRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre fases puenteadas");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
					}
					else
					{
						console.log("Sondas conectadas y puntas entre fases aisladas");
						tipoDeMedicion = "VOLTAJE_DC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AC_A_TRAVES_DE_RECEPTOR";//Pendiente revisar con Pere ¿Depende del estado del receptor?
					}
				}
				else if (conexionEntreNeutroRegleta1YNeutroRegleta2 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre neutros puenteados");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
					}
					else
					{
						console.log("Sondas conectadas y puntas entre neutros aislados");
						tipoDeMedicion = "VOLTAJE_DC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AC_A_TRAVES_DE_RECEPTOR";//Pendiente revisar con Pere ¿Depende del estado del receptor?
					}
				}
				else if (conexionEntreNeutroRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "VOLTAJE_DC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AC";					
					}
					else
					{
						console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
					}
				}
				else if (conexionEntreNeutroRegleta2YFaseRegleta1 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "VOLTAJE_DC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AC";								
					}
					else
					{
						console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
					}
				}
				else if (conexionDeSondasAMismoPunto == true)
				{
						console.log("Sondas conectadas entre ellas.");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
				}
			}
			else if (sondasDesconectadas == false && configuracionMedicionIntensidad10A == true && conexionDePuntasIncompleta == false)
			{
				if ((conexionEntreNeutroRegleta1YFaseRegleta1 == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta2 == true && puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
					|| (conexionEntreNeutroRegleta1YFaseRegleta2 == true && puenteFaseConectadoARegleta == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta1 == true && puenteNeutroConectadoARegleta == true))
				{
					console.log("Sondas conectadas y puntas entre Fase y Neutro");
					tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";
				}
				else if (conexionEntreNeutroRegleta2YFaseRegleta2 == true && (puenteFaseConectadoARegleta == false || puenteNeutroConectadoARegleta == false))
				{
					console.log("Sondas conectadas y puntas entre Fase y Neutro en la regleta 2, con los puentes desconectados");
					tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
				}
				else if (conexionEntreFaseRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre fases puenteadas");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";
					}
					else
					{
						console.log("Sondas conectadas y puntas entre fases aisladas");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";
					}
				}
				else if (conexionEntreNeutroRegleta1YNeutroRegleta2 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre neutros puenteados");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";
					}
					else
					{
						console.log("Sondas conectadas y puntas entre neutros aislados");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";
					}
				}
				else if (conexionEntreNeutroRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";					
					}
					else
					{
						console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
					}
				}
				else if (conexionEntreNeutroRegleta2YFaseRegleta1 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";								
					}
					else
					{
						console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";						
					}
				}
				else if (conexionDeSondasAMismoPunto == true)
				{
						console.log("Sondas conectadas entre ellas.");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";
				}
			}
			else
			{console.log("Assert linha 2752");
			}
			break;
		case 6: case 7: case 8: case 9:
			console.log("Medimos voltaje AC en caso de uso AC");
			if (sondasDesconectadas == true)
			{
				tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
				clearInterval(oscilacionValorMedido);
				clearInterval(oscilacionValorMedidoIntensidadmA);
				clearInterval(oscilacionValorMedidoIntensidad10A);
				//solucion = 'VALOR_0'
				if (puenteNeutroConectadoARegleta == true && puenteFaseConectadoARegleta == true)
				{
					conexionCorrectaParaReceptor = true;
				}
				else
				{
					conexionCorrectaParaReceptor = false;
				}
			}
			else if (sondasDesconectadas == false && conexionDePuntasIncompleta == true)
			{
				console.log("Sondas conectadas pero por lo menos una punta desconetada");
				tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
				clearInterval(oscilacionValorMedido);
				clearInterval(oscilacionValorMedidoIntensidadmA);
				clearInterval(oscilacionValorMedidoIntensidad10A);
				//solucion = 'VALOR_0'
				if (puenteNeutroConectadoARegleta == true && puenteFaseConectadoARegleta == true)
				{
					conexionCorrectaParaReceptor = true;
				}
				else
				{
					conexionCorrectaParaReceptor = false;
				}
			}
			else if (sondasDesconectadas == false && configuracionMedicionVoltaje == true && conexionDePuntasIncompleta == false)
			{
				if ((conexionEntreNeutroRegleta1YFaseRegleta1 == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta2 == true && puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
					|| (conexionEntreNeutroRegleta1YFaseRegleta2 == true && puenteFaseConectadoARegleta == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta1 == true && puenteNeutroConectadoARegleta == true))
				{
					console.log("Sondas conectadas y puntas entre Fase y Neutro");
					tipoDeMedicion = "VOLTAJE_AC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AC";

					if (puenteNeutroConectadoARegleta == true && puenteFaseConectadoARegleta == true)
					{
						conexionCorrectaParaReceptor = true;
					}
					else
					{
						conexionCorrectaParaReceptor = false;
					}
				}
				else if (conexionEntreNeutroRegleta2YFaseRegleta2 == true && (puenteFaseConectadoARegleta == false || puenteNeutroConectadoARegleta == false))
				{
					console.log("Puentes desconectados");
					tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
					clearInterval(oscilacionValorMedido);
					oscilacionValorMedido = undefined;
					clearInterval(oscilacionValorMedidoIntensidadmA);
					clearInterval(oscilacionValorMedidoIntensidad10A);
					oscilacionValorMedidoIntensidadmA = undefined;
					conexionCorrectaParaReceptor = false;
				}
				else if (conexionEntreFaseRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre fases puenteadas");
						tipoDeMedicion = "VOLTAJE_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AC";
						conexionCorrectaParaReceptor = true;
					}
					else
					{
						console.log("Sondas conectadas y puntas entre fases aisladas");
						tipoDeMedicion = "VOLTAJE_AC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AC_A_TRAVES_DE_RECEPTOR";
						//solucion = 'VALOR_VOLTAJE_AC' depende del estado del receptor
						conexionCorrectaParaReceptor = false;
					}
				}
				else if (conexionEntreNeutroRegleta1YNeutroRegleta2 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre neutros puenteados");
						tipoDeMedicion = "VOLTAJE_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AC";
						conexionCorrectaParaReceptor = true;
					}
					else
					{
						console.log("Sondas conectadas y puntas entre neutros aislados");
						tipoDeMedicion = "VOLTAJE_AC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AC_A_TRAVES_DE_RECEPTOR";
						conexionCorrectaParaReceptor = false;
					}
				}
				else if (conexionEntreNeutroRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "VOLTAJE_AC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AC";
						conexionCorrectaParaReceptor = true;	
					}
					else
					{
						console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
						conexionCorrectaParaReceptor = false;
						clearInterval(oscilacionValorMedido);
						oscilacionValorMedido = undefined;
						clearInterval(oscilacionValorMedidoIntensidadmA);
						oscilacionValorMedidoIntensidadmA = undefined;
						clearInterval(oscilacionValorMedidoIntensidad10A);
						oscilacionValorMedidoIntensidad10A = undefined;
					}
				}
				else if (conexionEntreNeutroRegleta2YFaseRegleta1 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "VOLTAJE_AC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AC";
						conexionCorrectaParaReceptor = true;		
					}
					else
					{
						console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
						conexionCorrectaParaReceptor = false;
						clearInterval(oscilacionValorMedido);
						oscilacionValorMedido = undefined;
						clearInterval(oscilacionValorMedidoIntensidadmA);
						oscilacionValorMedidoIntensidadmA = undefined;
						clearInterval(oscilacionValorMedidoIntensidad10A);
						oscilacionValorMedidoIntensidad10A = undefined;
					}
				}
				else if (conexionDeSondasAMismoPunto == true)
				{
					tipoDeMedicion = 'VOLTAJE_AC_ENTRE_DOS_SONDAS_CONECTADAS_AL_MISMO_PUNTO_AC';
					conexionCorrectaParaReceptor = true;
				}
			}
			else if (sondasDesconectadas == false && configuracionMedicionIntensidad10A == true && conexionDePuntasIncompleta == false)
			{
				if ((conexionEntreNeutroRegleta1YFaseRegleta1 == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta2 == true && puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
					|| (conexionEntreNeutroRegleta1YFaseRegleta2 == true && puenteFaseConectadoARegleta == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta1 == true && puenteNeutroConectadoARegleta == true))
				{
					console.log("Sondas conectadas y puntas entre Fase y Neutro");
					tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";
				}
				else if (conexionEntreNeutroRegleta2YFaseRegleta2 == true && (puenteFaseConectadoARegleta == false || puenteNeutroConectadoARegleta == false))
				{
					console.log("Puentes desconectados");
					tipoDeMedicion ="MEDICION_INCORRECTA_DEVUELVE_CERO";
				}
				else if (conexionEntreFaseRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre fases puenteadas");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";
					}
					else
					{
						console.log("Sondas conectadas y puntas entre fases aisladas");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";
					}
				}
				else if (conexionEntreNeutroRegleta1YNeutroRegleta2 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre neutros puenteados");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";
					}
					else
					{
						console.log("Sondas conectadas y puntas entre neutros aislados");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";
					}
				}
				else if (conexionEntreNeutroRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";
					}
					else
					{
						console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
					}
				}
				else if (conexionEntreNeutroRegleta2YFaseRegleta1 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";					
					}
					else
					{
						console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
					}
				}
				else if (conexionDeSondasAMismoPunto == true)
				{
						console.log("Sondas conectadas entre ellas.");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";
				}
			}
			else
			{console.log("Assert linha 2752");
			}
			break;

		case 10:
			console.log("Medimos hfe");
			break;
		case 11: case 13:
			console.log("Medimos intensidad AC en caso de uso AC");
			if (sondasDesconectadas == true)
			{
				console.log("Sondas desconectadas");
				tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
				clearInterval(oscilacionValorMedido);
				clearInterval(oscilacionValorMedidoIntensidadmA);
				clearInterval(oscilacionValorMedidoIntensidad10A);
				//solucion = 'VALOR_0'
			}
			
			else if (sondasDesconectadas == false && conexionDePuntasIncompleta == true)
			{
				console.log("Sondas conectadas pero por lo menos una punta desconetada");
				tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
				clearInterval(oscilacionValorMedido);
				clearInterval(oscilacionValorMedidoIntensidadmA);
				clearInterval(oscilacionValorMedidoIntensidad10A);
				//solucion = 'VALOR_0'
			}
			
			else if (sondasDesconectadas == false && configuracionMedicionIntensidadmA == true && conexionDePuntasIncompleta == false)
			{
				if ((conexionEntreNeutroRegleta1YFaseRegleta1 == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta2 == true && puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
					|| (conexionEntreNeutroRegleta1YFaseRegleta2 == true && puenteFaseConectadoARegleta == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta1 == true && puenteNeutroConectadoARegleta == true))
				{
					console.log("Sondas conectadas y puntas entre Fase y Neutro");
					tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";
					//solucion = 'CORTOCIRCUITO'
				}
				
				else if (conexionEntreNeutroRegleta2YFaseRegleta2 == true && (puenteFaseConectadoARegleta == false || puenteNeutroConectadoARegleta == false))
				{
					console.log("Puentes desconectados");
					tipoDeMedicion ="MEDICION_INCORRECTA_DEVUELVE_CERO";
				}

				else if (conexionEntreFaseRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre fases puenteadas");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";
						conexionCorrectaParaReceptor = true;
					}
					else
					{
						console.log("Sondas conectadas y puntas entre fases aisladas");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AL_MISMO_POTENCIAL_AC";
						conexionCorrectaParaReceptor = true;
					}
				}
				else if (conexionEntreNeutroRegleta1YNeutroRegleta2 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre neutros puenteados");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";
						conexionCorrectaParaReceptor = true;
					}
					else
					{
						console.log("Sondas conectadas y puntas entre neutros aislados");
						tipoDeMedicion = "INTENSIDAD_DC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AL_MISMO_POTENCIAL_AC";
						conexionCorrectaParaReceptor = true;
					}
				}
				
				else if (conexionDeSondasAMismoPunto == true)
				{
					tipoDeMedicion = 'INTENSIDAD_AC_ENTRE_DOS_SONDAS_CONECTADAS_AL_MISMO_PUNTO_AC';
				}
			}
			else if (sondasDesconectadas == false && configuracionMedicionIntensidad10A == true && conexionDePuntasIncompleta == false)
			{
				if ((conexionEntreNeutroRegleta1YFaseRegleta1 == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta2 == true && puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
					|| (conexionEntreNeutroRegleta1YFaseRegleta2 == true && puenteFaseConectadoARegleta == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta1 == true && puenteNeutroConectadoARegleta == true))
				{
					console.log("Sondas conectadas y puntas entre Fase y Neutro");
					tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";
				}
				
				else if (conexionEntreNeutroRegleta2YFaseRegleta2 == true && (puenteFaseConectadoARegleta == false || puenteNeutroConectadoARegleta == false))
				{
					console.log("Puentes desconectados");
					tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
				}
				
				else if (conexionEntreFaseRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre fases puenteadas");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";
					}
					else
					{
						console.log("Sondas conectadas y puntas entre fases aisladas");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AL_MISMO_POTENCIAL_AC_A_TRAVES_DE_RECEPTOR";
					}
				}
				else if (conexionEntreNeutroRegleta1YNeutroRegleta2 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre neutros puenteados");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";
					}
					else
					{
						console.log("Sondas conectadas y puntas entre neutros aislados");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AL_MISMO_POTENCIAL_AC_A_TRAVES_DE_RECEPTOR";
					}
				}
				
				else if (conexionEntreNeutroRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";
					}
					else
					{
						console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
					}
				}
				
				else if (conexionEntreNeutroRegleta2YFaseRegleta1 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";
					}
					else
					{
						console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";						
					}
				}
				else if (conexionDeSondasAMismoPunto == true)
				{
						console.log("Sondas conectadas entre ellas.");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";
				}
			}
			else
			{console.log("Assert linha 2752");
			}
			break;
		case 12:
			console.log("Medimos intensidad AC en caso de uso AC");
			if (sondasDesconectadas == true)
			{
				console.log("Sondas desconectadas");
				tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
				clearInterval(oscilacionValorMedido);
				clearInterval(oscilacionValorMedidoIntensidadmA);
				clearInterval(oscilacionValorMedidoIntensidad10A);

				if (puenteNeutroConectadoARegleta == true && puenteFaseConectadoARegleta == true) conexionCorrectaParaReceptor = true;
				else conexionCorrectaParaReceptor = false;
				
			}
			else if (sondasDesconectadas == false && conexionDePuntasIncompleta == true)
			{
				console.log("Sondas conectadas pero por lo menos una punta desconetada");
				tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
				clearInterval(oscilacionValorMedido);
				clearInterval(oscilacionValorMedidoIntensidadmA);
				clearInterval(oscilacionValorMedidoIntensidad10A);

				if (puenteNeutroConectadoARegleta == true && puenteFaseConectadoARegleta == true) conexionCorrectaParaReceptor = true;
				else conexionCorrectaParaReceptor = false;

			}
			else if (sondasDesconectadas == false && configuracionMedicionIntensidadmA == true && conexionDePuntasIncompleta == false)
			{
				if ((conexionEntreNeutroRegleta1YFaseRegleta1 == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta2 == true && puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
					|| (conexionEntreNeutroRegleta1YFaseRegleta2 == true && puenteFaseConectadoARegleta == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta1 == true && puenteNeutroConectadoARegleta == true))
				{
					console.log("Sondas conectadas y puntas entre Fase y Neutro");
					tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";
					//solucion = 'CORTOCIRCUITO'
					
					if (puenteNeutroConectadoARegleta == true && puenteFaseConectadoARegleta == true) conexionCorrectaParaReceptor = true;
					else conexionCorrectaParaReceptor = false;
				}
				
				else if (conexionEntreNeutroRegleta2YFaseRegleta2 == true && (puenteFaseConectadoARegleta == false || puenteNeutroConectadoARegleta == false))
				{
					console.log("Puentes desconectados");
					tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
					conexionCorrectaParaReceptor = false;
				}

				else if (conexionEntreFaseRegleta1YFaseRegleta2 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						if (puenteFaseConectadoARegleta == true)
						{
							console.log("Sondas conectadas y puntas entre fases puenteadas");
							tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";
							conexionCorrectaParaReceptor = true;
						}
						else
						{
							console.log("Sondas conectadas y puntas entre fases aisladas");
							tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AL_MISMO_POTENCIAL_AC_A_TRAVES_DE_RECEPTOR";
							conexionCorrectaParaReceptor = true;
						}
					}

					else
					{
						console.log("Conexión sin camino de vuelta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
						conexionCorrectaParaReceptor = false;
					}
				}
	
				else if (conexionEntreNeutroRegleta1YNeutroRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{	
						if (puenteNeutroConectadoARegleta == true)
						{
							console.log("Sondas conectadas y puntas entre neutros puenteados");
							tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";
							conexionCorrectaParaReceptor = true;
						}
						else
						{
							console.log("Sondas conectadas y puntas entre neutros aislados");
							tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AL_MISMO_POTENCIAL_AC_A_TRAVES_DE_RECEPTOR";
							conexionCorrectaParaReceptor = true;
						}
					}
					
					else
					{
						console.log("Conexión sin camino de vuelta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
						conexionCorrectaParaReceptor = false;
					}
				}
		
				else if (conexionEntreNeutroRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";

						if (puenteNeutroConectadoARegleta == true && puenteFaseConectadoARegleta == true) conexionCorrectaParaReceptor = true;
						else conexionCorrectaParaReceptor = false;
					}
					else
					{
						console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						if (puenteNeutroConectadoARegleta == true && puenteFaseConectadoARegleta == true) conexionCorrectaParaReceptor = true;
						else conexionCorrectaParaReceptor = false;
					}
				}

				else if (conexionEntreNeutroRegleta2YFaseRegleta1 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";

						if (puenteNeutroConectadoARegleta == true && puenteFaseConectadoARegleta == true) conexionCorrectaParaReceptor = true;
						else conexionCorrectaParaReceptor = false;
					}
					else
					{
						console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";					

						if (puenteNeutroConectadoARegleta == true && puenteFaseConectadoARegleta == true) conexionCorrectaParaReceptor = true;
						else conexionCorrectaParaReceptor = false;
					}
				}

				else if (conexionDeSondasAMismoPunto == true)
				{
					tipoDeMedicion = 'INTENSIDAD_AC_ENTRE_DOS_SONDAS_CONECTADAS_AL_MISMO_PUNTO_AC';

					if (puenteNeutroConectadoARegleta == true && puenteFaseConectadoARegleta == true) conexionCorrectaParaReceptor = true;
					else conexionCorrectaParaReceptor = false;
				}
			}
			else if (sondasDesconectadas == false && configuracionMedicionIntensidad10A == true && conexionDePuntasIncompleta == false)
			{
				if ((conexionEntreNeutroRegleta1YFaseRegleta1 == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta2 == true && puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
					|| (conexionEntreNeutroRegleta1YFaseRegleta2 == true && puenteFaseConectadoARegleta == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta1 == true && puenteNeutroConectadoARegleta == true))
				{
					console.log("Sondas conectadas y puntas entre Fase y Neutro");
					tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";

					if (puenteNeutroConectadoARegleta == true && puenteFaseConectadoARegleta == true) conexionCorrectaParaReceptor = true;
					else conexionCorrectaParaReceptor = false;
				}
				else if (conexionEntreNeutroRegleta2YFaseRegleta2 == true && (puenteFaseConectadoARegleta == false || puenteNeutroConectadoARegleta == false))
				{
					console.log("Puentes desconectados");
					tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
					conexionCorrectaParaReceptor = false;
				}
				else if (conexionEntreFaseRegleta1YFaseRegleta2 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						if (puenteFaseConectadoARegleta == true)
						{
							console.log("Sondas conectadas y puntas entre fases puenteadas");
							tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";
							conexionCorrectaParaReceptor = true;
						}
						else
						{
							console.log("Sondas conectadas y puntas entre fases aisladas");
							tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AL_MISMO_POTENCIAL_AC_A_TRAVES_DE_RECEPTOR";
							conexionCorrectaParaReceptor = true;
						}
					}

					else
					{
						console.log("Conexión sin camino de vuelta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
						conexionCorrectaParaReceptor = false;
					}
				}

				else if (conexionEntreNeutroRegleta1YNeutroRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						if (puenteNeutroConectadoARegleta == true)
						{
							console.log("Sondas conectadas y puntas entre neutros puenteados");
							tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";
							conexionCorrectaParaReceptor = true;
						}
						else
						{
							console.log("Sondas conectadas y puntas entre neutros aislados");
							tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AL_MISMO_POTENCIAL_AC_A_TRAVES_DE_RECEPTOR";
							conexionCorrectaParaReceptor = true;
						}
					}
					
					else
					{
						console.log("Conexión sin camino de vuelta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
						conexionCorrectaParaReceptor = false;
					}
				}
				
				else if (conexionEntreNeutroRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";

						if (puenteNeutroConectadoARegleta == true && puenteFaseConectadoARegleta == true) conexionCorrectaParaReceptor = true;
						else conexionCorrectaParaReceptor = false;
					}
					else
					{
						console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						if (puenteNeutroConectadoARegleta == true && puenteFaseConectadoARegleta == true) conexionCorrectaParaReceptor = true;
						else conexionCorrectaParaReceptor = false;
					}
				}

				else if (conexionEntreNeutroRegleta2YFaseRegleta1 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";

						if (puenteNeutroConectadoARegleta == true && puenteFaseConectadoARegleta == true) conexionCorrectaParaReceptor = true;
						else conexionCorrectaParaReceptor = false;
					}
					else
					{
						console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";					

						if (puenteNeutroConectadoARegleta == true && puenteFaseConectadoARegleta == true) conexionCorrectaParaReceptor = true;
						else conexionCorrectaParaReceptor = false;
					}
				}

				else if (conexionDeSondasAMismoPunto == true)
				{
						console.log("Sondas conectadas entre ellas.");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";

						if (puenteNeutroConectadoARegleta == true && puenteFaseConectadoARegleta == true) conexionCorrectaParaReceptor = true;
						else conexionCorrectaParaReceptor = false;
				}
			}
			else
			{console.log("Assert linha 2752");
			}
			break;

		case 14: case 16: case 17:
			console.log("Medimos intensidad DC en caso de uso AC");
			if (sondasDesconectadas == true)
			{
				console.log("Sondas desconectadas");
				tipoDeMedicion = 'MEDICION_INCORRECTA';
				clearInterval(oscilacionValorMedido);
				clearInterval(oscilacionValorMedidoIntensidadmA);
				clearInterval(oscilacionValorMedidoIntensidad10A);
			}
			else if (sondasDesconectadas == false && conexionDePuntasIncompleta == true)
			{
				console.log("Sondas conectadas pero por lo menos una punta desconetada");
				tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
				clearInterval(oscilacionValorMedido);
				clearInterval(oscilacionValorMedidoIntensidadmA);
				clearInterval(oscilacionValorMedidoIntensidad10A);

				//solucion = 'VALOR_0'
			}
			else if (sondasDesconectadas == false && configuracionMedicionIntensidadmA == true && conexionDePuntasIncompleta == false)
			{
				if ((conexionEntreNeutroRegleta1YFaseRegleta1 == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta2 == true && puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
					|| (conexionEntreNeutroRegleta1YFaseRegleta2 == true && puenteFaseConectadoARegleta == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta1 == true && puenteNeutroConectadoARegleta == true))
				{
					console.log("Sondas conectadas y puntas entre Fase y Neutro");
					tipoDeMedicion = "INTENSIDAD_DC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";
					//solucion = 'CORTOCIRCUITO'
				}

				else if (conexionEntreNeutroRegleta2YFaseRegleta2 == true && (puenteFaseConectadoARegleta == false || puenteNeutroConectadoARegleta == false))
				{
					console.log("Puentes desconectados");
					tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
				}

				else if (conexionEntreFaseRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre fases puenteadas");
						tipoDeMedicion = "INTENSIDAD_DC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";
						conexionCorrectaParaReceptor = true;
					}
					else
					{
						console.log("Sondas conectadas y puntas entre fases aisladas");
						tipoDeMedicion = "INTENSIDAD_DC_ENTRE_DOS_PUNTOS_DESCONECTADOS_A_DISTINTO_POTENCIAL_AC_A_TRAVES_DE_RECEPTOR";
						//solucion = 'VALOR_VOLTAJE_AC' depende del estado del receptor
					}
				}
			
				else if (conexionEntreNeutroRegleta1YNeutroRegleta2 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre neutros puenteados");
						tipoDeMedicion = "INTENSIDAD_DC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";
						conexionCorrectaParaReceptor = true;
					}
					else
					{
						console.log("Sondas conectadas y puntas entre neutros aislados");
						tipoDeMedicion = "INTENSIDAD_DC_ENTRE_DOS_PUNTOS_DESCONECTADOS_A_DISTINTO_POTENCIAL_AC_A_TRAVES_DE_RECEPTOR";
						//solucion = 'VALOR_VOLTAJE_AC' depende del estado del receptor
					}
				}
			
				else if (conexionEntreNeutroRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "INTENSIDAD_DC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";
					}
					else
					{
						console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
					}
				}
				
				else if (conexionEntreNeutroRegleta2YFaseRegleta1 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "INTENSIDAD_DC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";
					}
					else
					{
						console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";					
					}
				}

				else if (conexionDeSondasAMismoPunto == true)
				{
					console.log("Sondas conectadas entre ellas.");
					tipoDeMedicion = 'INTENSIDAD_DC_ENTRE_DOS_SONDAS_CONECTADAS_AL_MISMO_PUNTO_AC';
				}
			}			
			
			else if (sondasDesconectadas == false && configuracionMedicionIntensidad10A == true && conexionDePuntasIncompleta == false)
			{
				if ((conexionEntreNeutroRegleta1YFaseRegleta1 == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta2 == true && puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
					|| (conexionEntreNeutroRegleta1YFaseRegleta2 == true && puenteFaseConectadoARegleta == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta1 == true && puenteNeutroConectadoARegleta == true))
				{
					console.log("Sondas conectadas y puntas entre Fase y Neutro");
					tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";
				}
				else if (conexionEntreNeutroRegleta2YFaseRegleta2 == true && (puenteFaseConectadoARegleta == false || puenteNeutroConectadoARegleta == false))
				{
					console.log("Puentes desconectados");
					tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
				}
				else if (conexionEntreFaseRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre fases puenteadas");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";
					}
					else
					{
						console.log("Sondas conectadas y puntas entre fases aisladas");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AL_MISMO_POTENCIAL_AC_A_TRAVES_DE_RECEPTOR";
					}
				}
				else if (conexionEntreNeutroRegleta1YNeutroRegleta2 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre neutros puenteados");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";
					}
					else
					{
						console.log("Sondas conectadas y puntas entre neutros aislados");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AL_MISMO_POTENCIAL_AC_A_TRAVES_DE_RECEPTOR";
					}
				}
				else if (conexionEntreNeutroRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";
					}
					else
					{
						console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
					}
				}
				else if (conexionEntreNeutroRegleta2YFaseRegleta1 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";
					}
					else
					{
						console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
					}
				}
				else if (conexionDeSondasAMismoPunto == true)
				{
						console.log("Sondas conectadas entre ellas.");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";
				}
			}
			else
			{console.log("Assert linha 2752");
			}
			break;
		case 15:
			console.log("Medimos intensidad DC en caso de uso AC");
			if (sondasDesconectadas == true)
			{
				console.log("Sondas desconectadas");
				tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
				clearInterval(oscilacionValorMedido);
				clearInterval(oscilacionValorMedidoIntensidadmA);
				clearInterval(oscilacionValorMedidoIntensidad10A);
				//solucion = 'VALOR_0'
			}
			else if (sondasDesconectadas == false && conexionDePuntasIncompleta == true)
			{
				console.log("Sondas conectadas pero por lo menos una punta desconetada");
				tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
				clearInterval(oscilacionValorMedido);
				clearInterval(oscilacionValorMedidoIntensidadmA);
				clearInterval(oscilacionValorMedidoIntensidad10A);

				//solucion = 'VALOR_0'
			}
			else if (sondasDesconectadas == false && configuracionMedicionIntensidadmA == true && conexionDePuntasIncompleta == false)
			{
				if ((conexionEntreNeutroRegleta1YFaseRegleta1 == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta2 == true && puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
					|| (conexionEntreNeutroRegleta1YFaseRegleta2 == true && puenteFaseConectadoARegleta == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta1 == true && puenteNeutroConectadoARegleta == true))
				{
					console.log("Sondas conectadas y puntas entre Fase y Neutro");
					tipoDeMedicion = "INTENSIDAD_DC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AC";
					//solucion = 'CORTOCIRCUITO'
				}
				else if (conexionEntreNeutroRegleta2YFaseRegleta2 == true && (puenteFaseConectadoARegleta == false || puenteNeutroConectadoARegleta == false))
				{
					console.log("Puentes desconectados");
					tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
				}

				else if (conexionEntreFaseRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre fases puenteadas");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";
						conexionCorrectaParaReceptor = true;
					}
					else
					{
						console.log("Sondas conectadas y puntas entre fases aisladas");
						tipoDeMedicion = "INTENSIDAD_DC_ENTRE_DOS_PUNTOS_DESCONECTADOS_A_DISTINTO_POTENCIAL_AC_A_TRAVES_DE_RECEPTOR";
						//solucion = 'VALOR_VOLTAJE_AC' depende del estado del receptor
					}
				}
				else if (conexionEntreNeutroRegleta1YNeutroRegleta2 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre neutros puenteados");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";
						conexionCorrectaParaReceptor = true;
					}
					else
					{
						console.log("Sondas conectadas y puntas entre neutros aislados");
						tipoDeMedicion = "INTENSIDAD_DC_ENTRE_DOS_PUNTOS_DESCONECTADOS_A_DISTINTO_POTENCIAL_AC_A_TRAVES_DE_RECEPTOR";
						//solucion = 'VALOR_VOLTAJE_AC' depende del estado del receptor
					}
				}
				
				else if (conexionEntreNeutroRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";
					}
					else
					{
						console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
					}
				}
				
				else if (conexionEntreNeutroRegleta2YFaseRegleta1 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";
					}
					else
					{
						console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
					}
				}

				else if (conexionDeSondasAMismoPunto == true)
				{
					tipoDeMedicion = 'INTENSIDAD_DC_ENTRE_DOS_SONDAS_CONECTADAS_AL_MISMO_PUNTO_AC';
				}
			}
			else if (sondasDesconectadas == false && configuracionMedicionIntensidad10A == true && conexionDePuntasIncompleta == false)
			{
				if ((conexionEntreNeutroRegleta1YFaseRegleta1 == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta2 == true && puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
					|| (conexionEntreNeutroRegleta1YFaseRegleta2 == true && puenteFaseConectadoARegleta == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta1 == true && puenteNeutroConectadoARegleta == true))
				{
					console.log("Sondas conectadas y puntas entre Fase y Neutro");
					tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";
				}
				else if (conexionEntreNeutroRegleta2YFaseRegleta2 == true && (puenteFaseConectadoARegleta == false || puenteNeutroConectadoARegleta == false))
				{
					console.log("Puentes desconectados");
					tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
				}
				else if (conexionEntreFaseRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre fases puenteadas");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";
					}
					else
					{
						console.log("Sondas conectadas y puntas entre fases aisladas");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AL_MISMO_POTENCIAL_AC_A_TRAVES_DE_RECEPTOR";
					}
				}
				else if (conexionEntreNeutroRegleta1YNeutroRegleta2 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre neutros puenteados");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";
					}
					else
					{
						console.log("Sondas conectadas y puntas entre neutros aislados");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AL_MISMO_POTENCIAL_AC_A_TRAVES_DE_RECEPTOR";
					}
				}
				else if (conexionEntreNeutroRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";
					}
					else
					{
						console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
					}
				}
				else if (conexionEntreNeutroRegleta2YFaseRegleta1 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC";
					}
					else
					{
						console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
					}
				}
				else if (conexionDeSondasAMismoPunto == true)
				{
					console.log("Sondas conectadas entre ellas.");
					tipoDeMedicion = "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC";
				}
			}
			else
			{console.log("Assert linha 2752");
			}
			break;

		case 18: case 19: case 20: case 21: case 22: case 23:
		
			if ((sondasDesconectadas == true)
				|| (sondasDesconectadas == false && configuracionMedicionVoltaje == true && conexionDePuntasIncompleta == true)
				|| (sondasDesconectadas == false && configuracionMedicionIntensidad10A == true && conexionDePuntasIncompleta == true))
				{
					tipoDeMedicion = 'MEDICION_FUERA_DE_ESCALA';
					
					clearInterval(oscilacionValorMedido);
					clearInterval(oscilacionValorMedidoIntensidadmA);
					clearInterval(oscilacionValorMedidoIntensidad10A);

					if (puenteNeutroConectadoARegleta == true && puenteFaseConectadoARegleta == true)
					{
						conexionCorrectaParaReceptor = true;
					}
					else
					{
						conexionCorrectaParaReceptor = false;
					}
				}
				
			else
				{
					alert("Casos sin implementar");
				}
			break;
	}	

	console.log(tipoDeMedicion);
}

//-----------------------------------------------------------------------------------------------------------------------
function medicion_fuera_de_escala()
{
	representaFueraDeEscala();
}

//-----------------------------------------------------------------------------------------------------------------------
function interpretaMedicionSegunTipo()
{
	switch(tipoDeMedicion)
	{
		case "MEDICION_INCORRECTA_DEVUELVE_CERO":
			console.log("Topología incorrecta para medir no afectada por ruido.");
			medicion_incorrecta_devuelve_cero();
			break;
		case "MEDICION_INCORRECTA_RUIDO_BLANCO":
			console.log("Topología incorrecta para medir afectada por ruido y conexión de sondas.");
			medicion_incorrecta_ruido_blanco();
			break;
		case "MEDICION_FUERA_DE_ESCALA":
			console.log("Solución fuera de escala por defecto.");
			medicion_fuera_de_escala();
		case "VOLTAJE_DC_ENTRE_DOS_SONDAS_CONECTADAS_AL_MISMO_PUNTO_AC":
			clearInterval(variableParasetInterval);
			variableParasetInterval = undefined;
			voltaje_dc_entre_dos_sondas_conectadas_al_mismo_punto_ac();
			break;
		case "VOLTAJE_DC_ENTRE_DOS_PUNTOS_CONECTADOS_AC_SIN_RIZADO":
			clearInterval(variableParasetInterval);
			variableParasetInterval = undefined;
			voltaje_dc_entre_dos_puntos_conectados_ac_sin_rizado();
			break;
		case "VOLTAJE_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AC":
			clearInterval(variableParasetInterval);
			variableParasetInterval = undefined;
			voltaje_ac_entre_dos_puntos_conectados_ac();
			break;
		case "VOLTAJE_DC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AC":
			clearInterval(variableParasetInterval);
			variableParasetInterval = undefined;
			voltaje_dc_entre_dos_puntos_desconectados_ac();
			break;
		case "VOLTAJE_AC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AC":
			clearInterval(variableParasetInterval);
			variableParasetInterval = undefined;
			voltaje_ac_entre_dos_puntos_desconectados_ac()
			break;
		case "VOLTAJE_DC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AC_A_TRAVES_DE_RECEPTOR":
			clearInterval(variableParasetInterval);
			variableParasetInterval = undefined;
			voltaje_dc_entre_dos_puntos_desconectados_ac_a_traves_de_receptor();
			break;
		case "VOLTAJE_AC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AC_A_TRAVES_DE_RECEPTOR":
			clearInterval(variableParasetInterval);
			variableParasetInterval = undefined;
			voltaje_ac_entre_dos_puntos_desconectados_ac_a_traves_de_receptor();
			break;
		case "INTENSIDAD_DC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AL_MISMO_POTENCIAL_AC":
			clearInterval(variableParasetInterval);
			variableParasetInterval = undefined;
			intensidad_dc_entre_dos_puntos_desconectados_al_mismo_potencial_ac();
			break;
		case "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AL_MISMO_POTENCIAL_AC":
			clearInterval(variableParasetInterval);
			variableParasetInterval = undefined;
			intensidad_ac_entre_dos_puntos_desconectados_al_mismo_potencial_ac();
			break;
		case "INTENSIDAD_DC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AL_MISMO_POTENCIAL_AC_A_TRAVES_DE_RECEPTOR":
			clearInterval(variableParasetInterval);
			variableParasetInterval = undefined;
			intensidad_dc_entre_dos_puntos_desconectados_al_mismo_potencial_ac_a_traves_de_receptor();
			break;
		case "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AL_MISMO_POTENCIAL_AC_A_TRAVES_DE_RECEPTOR":
			clearInterval(variableParasetInterval);
			variableParasetInterval = undefined;
			intensidad_ac_entre_dos_puntos_desconectados_al_mismo_potencial_ac_a_traves_de_receptor();
			break;break;
		case "INTENSIDAD_DC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC":
			clearInterval(variableParasetInterval);
			variableParasetInterval = undefined;
			intensidad_dc_entre_dos_puntos_a_diferente_potencial_ac();
			break;
		case "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC":
			clearInterval(variableParasetInterval);
			variableParasetInterval = undefined;
			intensidad_ac_entre_dos_puntos_a_diferente_potencial_ac();
			break;
		case "INTENSIDAD_AC_ENTRE_DOS_PUNTOS_CONECTADOS_AL_MISMO_POTENCIAL_AC":
			clearInterval(variableParasetInterval);
			variableParasetInterval = undefined;
			intensidad_ac_entre_dos_puntos_conectados_al_mismo_potencial_ac();
		break;
			default: console.log("Assert linha 3144"); break;
	}
}

//-----------------------------------------------------------------------------------------------------------------------


/*	console.log("Analizamos la conexión");
	// el circuito lo cierran los puentes
	if ((puenteFaseConectadoARegleta == false || puenteNeutroConectadoARegleta == false)
	&& ((sondaRojaConectadaARegletaFase1 == false && sondaRojaConectadaARegletaFase2 == false
	&& sondaRojaConectadaARegletaNeutro1 == false && sondaRojaConectadaARegletaNeutro2 == false)
	|| (sondaNegraConectadaARegletaFase1 == false && sondaNegraConectadaARegletaFase2 == false
	&& sondaNegraConectadaARegletaNeutro1 == false && sondaNegraConectadaARegletaNeutro2 == false)
	|| (conectorRojoConectadoA10A == false && conectorRojoConectadoACOM == false && conectorRojoConectadoAVRA == false)
	|| (conectorNegroConectadoA10A == false && conectorNegroConectadoACOM == false && conectorNegroConectadoAVRA == false)))
	{
		console.log("Algún puente no está conectado y las sondas tampoco.");
		conexionCorrectaParaReceptor = false;
		conexionCorrectaParaMedicion = false;		
	}

	else if ((puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
	&& (sondaRojaConectadaARegletaFase1 == false && sondaRojaConectadaARegletaFase2 == false
	&& sondaRojaConectadaARegletaNeutro1 == false && sondaRojaConectadaARegletaNeutro2 == false)
	|| (sondaNegraConectadaARegletaFase1 == false && sondaNegraConectadaARegletaFase2 == false
	&& sondaNegraConectadaARegletaNeutro1 == false && sondaNegraConectadaARegletaNeutro2 == false)
	|| (conectorRojoConectadoA10A == false && conectorRojoConectadoACOM == false && conectorRojoConectadoAVRA == false)
	|| (conectorNegroConectadoA10A == false && conectorNegroConectadoACOM == false && conectorNegroConectadoAVRA == false))
	{
		console.log("Los puentes están conectados, pero alguna punta de las sondas o algun conector en el multímetro no lo está.");
		conexionCorrectaParaReceptor = true;
		conexionCorrectaParaMedicion = false;		
	}
	
	else if ((puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
	&& ((conectorRojoConectadoAVRA == true && conectorNegroConectadoACOM == true)
	|| (conectorNegroConectadoAVRA == true && conectorRojoConectadoACOM == true))
	&& ((sondaRojaConectadaARegletaNeutro1 == true && sondaNegraConectadaARegletaFase1 == true)
	|| (sondaRojaConectadaARegletaNeutro1 == true && sondaNegraConectadaARegletaFase2 == true)
	|| (sondaRojaConectadaARegletaNeutro2 == true && sondaNegraConectadaARegletaFase1 == true)
	|| (sondaRojaConectadaARegletaNeutro2 == true && sondaNegraConectadaARegletaFase2 == true)
	|| (sondaNegraConectadaARegletaNeutro1 == true && sondaRojaConectadaARegletaFase1 == true)
	|| (sondaNegraConectadaARegletaNeutro1 == true && sondaRojaConectadaARegletaFase2 == true)
	|| (sondaNegraConectadaARegletaNeutro2 == true && sondaRojaConectadaARegletaFase1 == true)
	|| (sondaNegraConectadaARegletaNeutro2 == true && sondaRojaConectadaARegletaFase2 == true)))
	{
		console.log("Los puentes están conectados y las sondas conectadas entre fase y neutro, en cualquier punto.");
		switch(indicePosicionSelector)
		{
			case 0: break;
			case 1:	case 2: case 3: case 4: case 5:
				conexionCorrectaParaReceptor = true;
				conexionCorrectaParaMedicion = false;
				break;
			case 6: case 7: case 8: case 9:
				conexionCorrectaParaReceptor = true;
				conexionCorrectaParaMedicion = true;
				break;
			case 10: break;
				break;
			case 11: case 12: case 13: case 14: case 15: case 16: case 17:
				conexionCorrectaParaReceptor = true;
				conexionCorrectaParaMedicion = true;
				break;
			case 18: case 19: case 20: case 21: case 22: case 23:
				conexionCorrectaParaReceptor = true;
				conexionCorrectaParaMedicion = true;
				break;
		}
	}

	switch(indicePosicionSelector)
	{
		case 0:
		{
			if (puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
			{
				conexionCorrectaParaReceptor = true;
				conexionCorrectaParaMedicion = true;
			}
			else
			{
				conexionCorrectaParaReceptor = false;
				conexionCorrectaParaMedicion = false;	
			}
			break;
		}
		case 1: //todos los casos de voltaje en continua
		case 2:
		case 3:
		case 4:
		case 5:
			if (((conectorRojoConectadoAVRA == true && conectorNegroConectadoACOM == true)
				|| (conectorNegroConectadoAVRA == true && conectorRojoConectadoACOM == true))
				&& (sondaRojaConectadaARegletaNeutro1 == true || sondaRojaConectadaARegletaNeutro2 == true
					|| sondaRojaConectadaARegletaFase1 == true || sondaRojaConectadaARegletaFase2 == true)
				&&  (sondaNegraConectadaARegletaNeutro1 == true || sondaNegraConectadaARegletaNeutro2 == true
					|| sondaNegraConectadaARegletaFase1 == true || sondaNegraConectadaARegletaFase2 == true))
				{
					console.log("Los cuatro puntos de las sondas están conectados en algún sitio");
					conexionCorrectaParaReceptor = true;
					conexionCorrectaParaMedicion = false;			
				}
				break;
		case 6:
		case 7:
		case 8:
		case 9:
		{
			
			
				
			else if ((puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
				&& ((conectorRojoConectadoAVRA == true && conectorNegroConectadoACOM == true)
					|| (conectorNegroConectadoAVRA == true && conectorRojoConectadoACOM == true))
				&& ((sondaRojaConectadaARegletaFase1 == true && sondaNegraConectadaARegletaFase2 == true)
					|| (sondaRojaConectadaARegletaNeutro1 == true && sondaNegraConectadaARegletaNeutro2 == true)
					|| (sondaRojaConectadaARegletaNeutro2 == true && sondaNegraConectadaARegletaNeutro1 == true)
					|| (sondaRojaConectadaARegletaFase1 == true && sondaNegraConectadaARegletaFase2 == true)
					|| (sondaRojaConectadaARegletaFase2 == true && sondaNegraConectadaARegletaFase1 == true)))
			{
				console.log("Los puentes están puestos y las sondas conectadas entre fases o entre neutros.");
				conexionCorrectaParaReceptor = true;
				conexionCorrectaParaMedicion = false; //sí mide, pero el resultado es 0.
			}
			
			else if ((puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == false)
				&& ((conectorRojoConectadoAVRA == true && conectorNegroConectadoACOM == true)
					|| (conectorNegroConectadoAVRA == true && conectorRojoConectadoACOM == true))
				&& (((sondaRojaConectadaARegletaFase1 == true || sondaNegraConectadaARegletaFase1 == true)
					&& (sondaRojaConectadaARegletaFase2 == true || sondaNegraConectadaARegletaFase2 == true))))
			{
				console.log("Únicamente está conectado el puente de la fase y las puntas entre fases");
				conexionCorrectaParaReceptor = false;
				conexionCorrectaParaMedicion = false;	
			}
			else if ((puenteFaseConectadoARegleta == false && puenteNeutroConectadoARegleta == true)
				&& ((conectorRojoConectadoAVRA == true && conectorNegroConectadoACOM == true)
					|| (conectorNegroConectadoAVRA == true && conectorRojoConectadoACOM == true))
				&& (((sondaRojaConectadaARegletaNeutro1 == true || sondaNegraConectadaARegletaNeutro1 == true)
					&& (sondaRojaConectadaARegletaNeutro2 == true || sondaNegraConectadaARegletaNeutro2 == true))))
			{
				console.log("Únicamente está conectado el puente del neutro y las puntas entre neutros");
				conexionCorrectaParaReceptor = false;
				conexionCorrectaParaMedicion = false;	
			}
			else if ((puenteFaseConectadoARegleta == false && puenteNeutroConectadoARegleta == true)
				&& ((conectorRojoConectadoAVRA == true && conectorNegroConectadoACOM == true)
					|| (conectorNegroConectadoAVRA == true && conectorRojoConectadoACOM == true))
				&& (((sondaRojaConectadaARegletaFase1 == true || sondaNegraConectadaARegletaFase1 == true)
					&& (sondaRojaConectadaARegletaFase2 == true || sondaNegraConectadaARegletaFase2 == true))))
			{
				console.log("Únicamente está conectado el puente del neutro y las puntas entre fases");
				conexionCorrectaParaReceptor = false;
				conexionCorrectaParaMedicion = true;	
			}
			else if ((puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == false)
				&& ((conectorRojoConectadoAVRA == true && conectorNegroConectadoACOM == true)
					|| (conectorNegroConectadoAVRA == true && conectorRojoConectadoACOM == true))
				&& (((sondaRojaConectadaARegletaNeutro1 == true || sondaNegraConectadaARegletaNeutro1 == true)
					&& (sondaRojaConectadaARegletaNeutro2 == true || sondaNegraConectadaARegletaNeutro2 == true))))
			{
				console.log("Únicamente está conectado el puente de la fase y las puntas entre neutros");
				conexionCorrectaParaReceptor = false;
				conexionCorrectaParaMedicion = true;	
			}
			else if ((puenteFaseConectadoARegleta == false && puenteNeutroConectadoARegleta == false)
				&& ((conectorRojoConectadoAVRA == true && conectorNegroConectadoACOM == true)
					|| (conectorNegroConectadoAVRA == true && conectorRojoConectadoACOM == true))
				&& ((sondaRojaConectadaARegletaNeutro1 == true && sondaNegraConectadaARegletaFase1 == true)
					|| (sondaNegraConectadaARegletaNeutro1 == true && sondaRojaConectadaARegletaFase1 == true)))
			{
				console.log("Sin puentes conectados y puntas en F1 y N1");
				conexionCorrectaParaReceptor = false;
				conexionCorrectaParaMedicion = true;	
			}
			else if ((puenteFaseConectadoARegleta == false && puenteNeutroConectadoARegleta == true)
				&& ((conectorRojoConectadoAVRA == true && conectorNegroConectadoACOM == true)
					|| (conectorNegroConectadoAVRA == true && conectorRojoConectadoACOM == true))
				&& ((sondaRojaConectadaARegletaNeutro1 == true && sondaNegraConectadaARegletaFase1 == true)
					|| (sondaNegraConectadaARegletaNeutro1 == true && sondaRojaConectadaARegletaFase1 == true)))
			{
				console.log("Únicamente puente neutro conectado y puntas en F1 y N1");
				conexionCorrectaParaReceptor = false;
				conexionCorrectaParaMedicion = true;	
			}
			else if ((puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == false)
				&& ((conectorRojoConectadoAVRA == true && conectorNegroConectadoACOM == true)
					|| (conectorNegroConectadoAVRA == true && conectorRojoConectadoACOM == true))
				&& ((sondaRojaConectadaARegletaNeutro1 == true && sondaNegraConectadaARegletaFase1 == true)
					|| (sondaNegraConectadaARegletaNeutro1 == true && sondaRojaConectadaARegletaFase1 == true)))
			{
				console.log("Únicamente puente fase conectado y puntas en F1 y N1");
				conexionCorrectaParaReceptor = false;
				conexionCorrectaParaMedicion = true;	
			}
			else if ((puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == false)
				&& ((conectorRojoConectadoAVRA == true && conectorNegroConectadoACOM == true)
					|| (conectorNegroConectadoAVRA == true && conectorRojoConectadoACOM == true))
				&& ((sondaRojaConectadaARegletaNeutro1 == true && sondaNegraConectadaARegletaFase2 == true)
					|| (sondaNegraConectadaARegletaNeutro1 == true && sondaRojaConectadaARegletaFase2 == true)))
			{
				console.log("Únicamente puente fase conectado y puntas en F2 y N1");
				conexionCorrectaParaReceptor = false;
				conexionCorrectaParaMedicion = true;	
			}
			else if ((puenteFaseConectadoARegleta == false && puenteNeutroConectadoARegleta == true)
				&& ((conectorRojoConectadoAVRA == true && conectorNegroConectadoACOM == true)
					|| (conectorNegroConectadoAVRA == true && conectorRojoConectadoACOM == true))
				&& ((sondaRojaConectadaARegletaNeutro2 == true && sondaNegraConectadaARegletaFase1 == true)
					|| (sondaNegraConectadaARegletaNeutro2 == true && sondaRojaConectadaARegletaFase1 == true)))
			{//dejamos puente neutro
				console.log("Únicamente puente neutro conectado y puntas en F1 y N2");
				conexionCorrectaParaReceptor = false;
				conexionCorrectaParaMedicion = true;	
			}
			else
			{
				console.log("Caso no contemplado");
				conexionCorrectaParaReceptor = false;
				conexionCorrectaParaMedicion = false;	
				console.log("help");
			}
			break;
		}
		case 10:
		case 11:
		case 12:
		case 13:
		case 14:
		case 15:
		case 16:
		case 17:
		{
			if (puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true
				&& sondaRojaConectadaARegletaFase1 == false && sondaRojaConectadaARegletaFase2 == false
				&& sondaNegraConectadaARegletaFase1 == false && sondaNegraConectadaARegletaFase2 == false)
			{
				conexionCorrectaParaReceptor = true;
				conexionCorrectaParaMedicion = false;
			}
			else if (puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == false
				&& ((sondaRojaConectadaARegletaNeutro1 == true && sondaNegraConectadaARegletaNeutro2 == true)
				|| (sondaRojaConectadaARegletaNeutro2 == true && sondaNegraConectadaARegletaNeutro1 == true))
				&& sondaRojaConectadaARegletaFase1 == false && sondaNegraConectadaARegletaFase2 == false
				&& (((conectorRojoConectadoA10A == true || conectorRojoConectadoAVRA == true) && conectorNegroConectadoACOM == true)
				||  ((conectorNegroConectadoA10A == true || conectorNegroConectadoAVRA == true) && conectorRojoConectadoACOM == true)))
			{
				conexionCorrectaParaReceptor = true;
				conexionCorrectaParaMedicion = true;
			}
			else if (puenteFaseConectadoARegleta == false && puenteNeutroConectadoARegleta == true
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
				conexionCorrectaParaMedicion = false;
			}
			break;
		}
	}
}
*/
//-----------------------------------------------------------------------------------------------------------------------
/*function obtieneMedicionSegunCasoDeUso()
{
	//clearInterval(myVar);
	
	switch (indicePosicionSelector)
	{
		case 0:  //console.log("Multímetro apagado");
			break;
		case 1:  //console.log("VDC - 200mV");
		case 2:  //console.log("VDC - 2V");
		case 3:  //console.log("VDC - 20V");
		case 4:  //console.log("VDC - 200V");
		case 5:  //console.log("VDC - 1000V");
			//ruido blanco con sonda sin conectar
			//0 con conexión
			document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaRoja.png')";
			return (0);
			break;			
		case 6:  //console.log("VAC - 750V");
		case 7:  //console.log("VAC - 200V");
		case 8:  //console.log("VAC - 20V");
		case 9:  //console.log("VAC - 2V");
			document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaVerde.png')";
			if (conexionCorrectaParaMedicion == true)
			{
				return(VoltajeAC);
			}
			else
			{
				return(0);
			}
			break;
			
		case 10: //console.log("hFE");
			return(0);
			break;
		case 11: //console.log("AAC - 2mA");
			document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaRoja.png')";
			if (conexionCorrectaParaMedicion == true && conectorRojoConectadoAVRA == true && estadoFusiblemA == "Correcto")
			{
				return(potenciaReceptor/VoltajeAC);
			}
			break
		case 12: //console.log("AAC - 20mA/10A");
			document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaVerde.png')";
			if (conexionCorrectaParaMedicion == true  && estadoFusiblemA == "Correcto")
			{
				return(potenciaReceptor/VoltajeAC);
			}
			else if (conexionCorrectaParaMedicion == true && puenteNeutroConectadoARegleta == true && puenteFaseConectadoARegleta == true
				&& (sondaRojaConectadaARegletaNeutro1 == false || sondaRojaConectadaARegletaNeutro2 == false
					|| sondaRojaConectadaARegletaFase1 == false || sondaNegraConectadaARegletaFase2 == false
					|| sondaNegraConectadaARegletaNeutro1 == false || sondaNegraConectadaARegletaNeutro2 == false
					|| sondaNegraConectadaARegletaFase1 == false || sondaNegraConectadaARegletaFase2 == false))
				return(0);
			else
				return(0);
			break

		case 13: //console.log("AAC - 200mA");
			document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaRoja.png')";
			if (conexionCorrectaParaMedicion == true && conectorRojoConectadoAVRA == true && estadoFusiblemA == "Correcto")
			{
				return(potenciaReceptor/VoltajeAC);
			}
			break
		case 14: //console.log("ADC - 200mA");
			if (conexionCorrectaParaMedicion == true && estadoFusiblemA == "Correcto")
			{
				estadoFusiblemA = "Fundido";
			}
			break
		case 15: //console.log("ADC - 20mA/10A");
			if (conexionCorrectaParaMedicion == true && estadoFusiblemA == "Correcto")
			{
				estadoFusiblemA = "Fundido";
			}
			break
		case 16: //console.log("ADC - 2mA");
			if (conexionCorrectaParaMedicion == true && estadoFusiblemA == "Correcto")
			{
				estadoFusiblemA = "Fundido";
			}
			break
		case 17: //console.log("ADC - 200uA");
			if (conexionCorrectaParaMedicion == true && estadoFusiblemA == "Correcto")
			{
				estadoFusiblemA = "Fundido";
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


var oscilacionValorMedido;
//---------------------------------------
function oscilaValor(valor)
{
	valorMedido = valor + Math.random()*10 - 5;
	console.log("Estabilización del valor medido en proceso");

	if ((valorMedido < valor + 2) && (valorMedido > valor - 2))
	{
		clearInterval(oscilacionValorMedido);
		console.log("Valor de la medida estabilizado");
	}

	analizaValorParaRepresentarEnPantalla();
}

//---------------------------------------
function oscilaValorIntensidad10A(valor)
{
	valorMedido = valor + Math.random()*0.1 - 5/100;
	console.log("Estabilización del valor medido en proceso");

	if ((valorMedido < valor + .02) && (valorMedido > valor - .02))
	{
		clearInterval(oscilacionValorMedidoIntensidad10A);
		console.log("Valor de la medida estabilizado");
	}

	analizaValorParaRepresentarEnPantalla();
}

//---------------------------------------
function oscilaValorIntensidadmA(valor)
{
	valorMedido = valor + Math.random()*0.1 - 5/100;
	console.log("Estabilización del valor medido en proceso");

	if ((valorMedido < valor + .02) && (valorMedido > valor - .02))
	{
		clearInterval(oscilacionValorMedidoIntensidadmA);
		console.log("Valor de la medida estabilizado");
	}

	analizaValorParaRepresentarEnPantalla();
}

//---------------------------------------
function voltaje_ac_entre_dos_puntos_desconectados_ac()
{

console.log("voltaje_ac_entre_dos_puntos_desconectados_ac()");

var voltajePuntoA = 0;
var voltajePuntoB = 230;
var diferenciaDePotencial = voltajePuntoB - voltajePuntoA;
 	
	clearInterval(oscilacionValorMedido);
 	oscilacionValorMedido = setInterval(function(){oscilaValor(diferenciaDePotencial);}, 800);

}

//-----------------------------
function medicion_incorrecta_ruido_blanco()
{
	console.log("Al no haber conexión valida simulamos valores de ruido.");

	if (variableParasetInterval)
	{}
	else
		variableParasetInterval = setInterval(generaRuidoBlanco, 400);
}

//-----------------------------
function medicion_incorrecta_devuelve_cero()
{
	clearInterval(variableParasetInterval);
	variableParasetInterval = undefined;
	valorMedido = 0;
	analizaValorParaRepresentarEnPantalla();	
}
//-----------------------------
function voltaje_dc_entre_dos_sondas_conectadas_al_mismo_punto_ac()
{
	console.log("voltaje_dc_entre_dos_sondas_conectadas_al_mismo_punto_ac()");
	valorMedido = 0;
}
//-----------------------------
function voltaje_dc_entre_dos_puntos_conectados_ac_sin_rizado()
{
	console.log("voltaje_dc_entre_dos_puntos_conectados_ac_sin_rizado()");
	valorMedido = 0;
}
//-----------------------------
function voltaje_ac_entre_dos_puntos_conectados_ac()
{
	console.log("voltaje_ac_entre_dos_puntos_conectados_ac()");
	valorMedido = 0;
}
//-----------------------------
function voltaje_dc_entre_dos_puntos_desconectados_ac()
{
	console.log("voltaje_dc_entre_dos_puntos_desconectados_ac()");
	valorMedido = 0;
}
//-----------------------------
function voltaje_dc_entre_dos_puntos_desconectados_ac_a_traves_de_receptor()
{
	console.log("voltaje_dc_entre_dos_puntos_desconectados_ac_a_traves_de_receptor()");
	valorMedido = 0;
}
//-----------------------------
function voltaje_ac_entre_dos_puntos_desconectados_ac_a_traves_de_receptor()
{
	console.log("voltaje_ac_entre_dos_puntos_desconectados_ac_a_traves_de_receptor()");
	valorMedido = 0;
}
//-----------------------------
var oscilacionValorMedidoIntensidad10A;

var oscilacionValorMedidoIntensidadmA;

function intensidad_dc_entre_dos_puntos_desconectados_al_mismo_potencial_ac()
{
	console.log("intensidad_dc_entre_dos_puntos_desconectados_al_mismo_potencial_ac()");
	valorMedido = 0;
}

//-----------------------------
function intensidad_ac_entre_dos_puntos_desconectados_al_mismo_potencial_ac()
{
	if (configuracionMedicionIntensidadmA)
	{
		console.log("intensidad_dc_entre_dos_puntos_desconectados_al_mismo_potencial_ac()");
		clearInterval(oscilacionValorMedidoIntensidadmA);
 		oscilacionValorMedidoIntensidadmA = setInterval(function(){oscilaValorIntensidadmA(potenciaReceptor/230);}, 800);
	}
	else if (configuracionMedicionIntensidad10A)
	{
		console.log("intensidad_ac_entre_dos_puntos_desconectados_al_mismo_potencial_ac()");
		clearInterval(oscilacionValorMedidoIntensidad10A);
	 	oscilacionValorMedidoIntensidad10A = setInterval(function(){oscilaValorIntensidad10A(potenciaReceptor/230);}, 800);	
	}
}

//-----------------------------
function intensidad_dc_entre_dos_puntos_desconectados_al_mismo_potencial_ac_a_traves_de_receptor()
{
	console.log("intensidad_dc_entre_dos_puntos_desconectados_al_mismo_potencial_ac_a_traves_de_receptor()");
	valorMedido = 0;
}
//-----------------------------
function intensidad_ac_entre_dos_puntos_desconectados_al_mismo_potencial_ac_a_traves_de_receptor()
{
	if (conexionCorrectaParaReceptor)
	{
		if (configuracionMedicionIntensidadmA)
		{
			console.log("intensidad_dc_entre_dos_puntos_desconectados_al_mismo_potencial_ac()");
			clearInterval(oscilacionValorMedidoIntensidadmA);
	 		oscilacionValorMedidoIntensidadmA = setInterval(function(){oscilaValorIntensidadmA(potenciaReceptor/230);}, 800);
		}
		else if (configuracionMedicionIntensidad10A)
		{
			console.log("intensidad_ac_entre_dos_puntos_desconectados_al_mismo_potencial_ac()");
			clearInterval(oscilacionValorMedidoIntensidad10A);
		 	oscilacionValorMedidoIntensidad10A = setInterval(function(){oscilaValorIntensidad10A(potenciaReceptor/230);}, 800);	
		}
		else
		{
			alert("Assert linha 4613");
		}
	}

	else
	{
		valorMedido = 0;	
	}
}
//-----------------------------
function intensidad_dc_entre_dos_puntos_a_diferente_potencial_ac()
{
	console.log("intensidad_dc_entre_dos_puntos_a_diferente_potencial_ac()");
	valorMedido = 0;
}
//-----------------------------
function intensidad_ac_entre_dos_puntos_a_diferente_potencial_ac()
{
	console.log("intensidad_ac_entre_dos_puntos_a_diferente_potencial_ac() = CORTOCIRCUITO")
	if ((configuracionMedicionIntensidad10A == true) && estadoFusible10ACorrecto == true)
	{
		audioExplosionElement.play();
		estadoFusible10ACorrecto = false;
		document.getElementById('polimetro').src = './images/polimetroExplotado.png';
	}
	else if ((configuracionMedicionIntensidadmA == true) && estadoFusiblemACorrecto == true)
	{
		audioExplosionElement.play();
		estadoFusiblemACorrecto = false;
		document.getElementById('polimetro').src = './images/polimetroFusibleFundido.png';
	}
	else
	{
	}
	
	valorMedido = 0;
}

//-----------------------------
function intensidad_ac_entre_dos_puntos_conectados_al_mismo_potencial_ac()
{
	console.log("intensidad_ac_entre_dos_puntos_conectados_al_mismo_potencial_ac()")
	valorMedido = 0;
}


//-----------------------------
function multimetroEstropeado()
{
	switch(indicePosicionSelector)
	{
		case 0: break;
		case 1:
			document.getElementById("D7S_1a").style.fill = "#808080";
			document.getElementById("D7S_1b").style.fill = "#141414";
			document.getElementById("D7S_1c").style.fill = "#141414";
			document.getElementById("D7S_1d").style.fill = "#808080";
			document.getElementById("D7S_1e").style.fill = "#808080";
			document.getElementById("D7S_1f").style.fill = "#808080";
			document.getElementById("D7S_1g").style.fill = "#141414";
			document.getElementById("D7S_2a").style.fill = "#808080";
			document.getElementById("D7S_2b").style.fill = "#808080";
			document.getElementById("D7S_2c").style.fill = "#141414";
			document.getElementById("D7S_2d").style.fill = "#808080";
			document.getElementById("D7S_2e").style.fill = "#808080";
			document.getElementById("D7S_2f").style.fill = "#141414";
			document.getElementById("D7S_2g").style.fill = "#808080";
			document.getElementById("D7S_3a").style.fill = "#808080";
			document.getElementById("D7S_3b").style.fill = "#808080";
			document.getElementById("D7S_3c").style.fill = "#141414";
			document.getElementById("D7S_3d").style.fill = "#808080";
			document.getElementById("D7S_3e").style.fill = "#808080";
			document.getElementById("D7S_3f").style.fill = "#808080";
			document.getElementById("D7S_3g").style.fill = "#141414";
			document.getElementById("D7S_4b").style.fill = "#808080";
			document.getElementById("D7S_4c").style.fill = "#141414";
			document.getElementById("signo").style.fill = "#808080";
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#141414";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#141414";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#141414";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";
			break;
		case 2:
			document.getElementById("D7S_1a").style.fill = "#808080";
			document.getElementById("D7S_1b").style.fill = "#808080";
			document.getElementById("D7S_1c").style.fill = "#141414";
			document.getElementById("D7S_1d").style.fill = "#808080";
			document.getElementById("D7S_1e").style.fill = "#141414";
			document.getElementById("D7S_1f").style.fill = "#808080";
			document.getElementById("D7S_1g").style.fill = "#808080";
			document.getElementById("D7S_2a").style.fill = "#808080";
			document.getElementById("D7S_2b").style.fill = "#808080";
			document.getElementById("D7S_2c").style.fill = "#141414";
			document.getElementById("D7S_2d").style.fill = "#808080";
			document.getElementById("D7S_2e").style.fill = "#808080";
			document.getElementById("D7S_2f").style.fill = "#808080";
			document.getElementById("D7S_2g").style.fill = "#808080";
			document.getElementById("D7S_3a").style.fill = "#808080";
			document.getElementById("D7S_3b").style.fill = "#808080";
			document.getElementById("D7S_3c").style.fill = "#808080";
			document.getElementById("D7S_3d").style.fill = "#808080";
			document.getElementById("D7S_3e").style.fill = "#808080";
			document.getElementById("D7S_3f").style.fill = "#141414";
			document.getElementById("D7S_3g").style.fill = "#808080";
			document.getElementById("D7S_4b").style.fill = "#808080";
			document.getElementById("D7S_4c").style.fill = "#141414";
			document.getElementById("signo").style.fill = "#808080";
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#141414";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#141414";
			document.getElementById("milivoltios").style.color = "#141414";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";
			break;
		case 3:
			document.getElementById("D7S_1a").style.fill = "#808080";
			document.getElementById("D7S_1b").style.fill = "#808080";
			document.getElementById("D7S_1c").style.fill = "#141414";
			document.getElementById("D7S_1d").style.fill = "#808080";
			document.getElementById("D7S_1e").style.fill = "#808080";
			document.getElementById("D7S_1f").style.fill = "#808080";
			document.getElementById("D7S_1g").style.fill = "#141414";
			document.getElementById("D7S_2a").style.fill = "#141414";
			document.getElementById("D7S_2b").style.fill = "#808080";
			document.getElementById("D7S_2c").style.fill = "#141414";
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
			document.getElementById("D7S_4b").style.fill = "#808080";
			document.getElementById("D7S_4c").style.fill = "#141414";
			document.getElementById("signo").style.fill = "#808080";
			document.getElementById("punto1").style.fill = "#141414";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#141414";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#141414";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";
			break;
		case 4:
			document.getElementById("D7S_1a").style.fill = "#808080";
			document.getElementById("D7S_1b").style.fill = "#141414";
			document.getElementById("D7S_1c").style.fill = "#808080";
			document.getElementById("D7S_1d").style.fill = "#141414";
			document.getElementById("D7S_1e").style.fill = "#808080";
			document.getElementById("D7S_1f").style.fill = "#808080";
			document.getElementById("D7S_1g").style.fill = "#141414";
			document.getElementById("D7S_2a").style.fill = "#808080";
			document.getElementById("D7S_2b").style.fill = "#808080";
			document.getElementById("D7S_2c").style.fill = "#141414";
			document.getElementById("D7S_2d").style.fill = "#808080";
			document.getElementById("D7S_2e").style.fill = "#808080";
			document.getElementById("D7S_2f").style.fill = "#808080";
			document.getElementById("D7S_2g").style.fill = "#808080";
			document.getElementById("D7S_3a").style.fill = "#808080";
			document.getElementById("D7S_3b").style.fill = "#808080";
			document.getElementById("D7S_3c").style.fill = "#141414";
			document.getElementById("D7S_3d").style.fill = "#808080";
			document.getElementById("D7S_3e").style.fill = "#808080";
			document.getElementById("D7S_3f").style.fill = "#808080";
			document.getElementById("D7S_3g").style.fill = "#141414";
			document.getElementById("D7S_4b").style.fill = "#808080";
			document.getElementById("D7S_4c").style.fill = "#141414";
			document.getElementById("signo").style.fill = "#808080";
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#141414";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#141414";
			document.getElementById("hfe").style.color = "#141414";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";
			break;
		case 5:
			document.getElementById("D7S_1a").style.fill = "#808080";
			document.getElementById("D7S_1b").style.fill = "#141414";
			document.getElementById("D7S_1c").style.fill = "#141414";
			document.getElementById("D7S_1d").style.fill = "#808080";
			document.getElementById("D7S_1e").style.fill = "#808080";
			document.getElementById("D7S_1f").style.fill = "#808080";
			document.getElementById("D7S_1g").style.fill = "#808080";
			document.getElementById("D7S_2a").style.fill = "#808080";
			document.getElementById("D7S_2b").style.fill = "#808080";
			document.getElementById("D7S_2c").style.fill = "#141414";
			document.getElementById("D7S_2d").style.fill = "#808080";
			document.getElementById("D7S_2e").style.fill = "#141414";
			document.getElementById("D7S_2f").style.fill = "#808080";
			document.getElementById("D7S_2g").style.fill = "#808080";
			document.getElementById("D7S_3a").style.fill = "#808080";
			document.getElementById("D7S_3b").style.fill = "#808080";
			document.getElementById("D7S_3c").style.fill = "#141414";
			document.getElementById("D7S_3d").style.fill = "#808080";
			document.getElementById("D7S_3e").style.fill = "#808080";
			document.getElementById("D7S_3f").style.fill = "#808080";
			document.getElementById("D7S_3g").style.fill = "#808080";
			document.getElementById("D7S_4b").style.fill = "#808080";
			document.getElementById("D7S_4c").style.fill = "#141414";
			document.getElementById("signo").style.fill = "#808080";
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#141414";
			document.getElementById("punto3").style.fill = "#808080";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#141414";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";
			break;
		case 6:
			document.getElementById("D7S_1a").style.fill = "#808080";
			document.getElementById("D7S_1b").style.fill = "#141414";
			document.getElementById("D7S_1c").style.fill = "#141414";
			document.getElementById("D7S_1d").style.fill = "#808080";
			document.getElementById("D7S_1e").style.fill = "#808080";
			document.getElementById("D7S_1f").style.fill = "#808080";
			document.getElementById("D7S_1g").style.fill = "#808080";
			document.getElementById("D7S_2a").style.fill = "#141414";
			document.getElementById("D7S_2b").style.fill = "#808080";
			document.getElementById("D7S_2c").style.fill = "#141414";
			document.getElementById("D7S_2d").style.fill = "#808080";
			document.getElementById("D7S_2e").style.fill = "#808080";
			document.getElementById("D7S_2f").style.fill = "#808080";
			document.getElementById("D7S_2g").style.fill = "#808080";
			document.getElementById("D7S_3a").style.fill = "#808080";
			document.getElementById("D7S_3b").style.fill = "#808080";
			document.getElementById("D7S_3c").style.fill = "#141414";
			document.getElementById("D7S_3d").style.fill = "#808080";
			document.getElementById("D7S_3e").style.fill = "#808080";
			document.getElementById("D7S_3f").style.fill = "#808080";
			document.getElementById("D7S_3g").style.fill = "#808080";
			document.getElementById("D7S_4b").style.fill = "#808080";
			document.getElementById("D7S_4c").style.fill = "#808080";
			document.getElementById("signo").style.fill = "#808080";
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#141414";
			document.getElementById("punto3").style.fill = "#141414";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#141414";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";
			break;
		case 7:
			document.getElementById("D7S_1a").style.fill = "#808080";
			document.getElementById("D7S_1b").style.fill = "#141414";
			document.getElementById("D7S_1c").style.fill = "#141414";
			document.getElementById("D7S_1d").style.fill = "#808080";
			document.getElementById("D7S_1e").style.fill = "#808080";
			document.getElementById("D7S_1f").style.fill = "#808080";
			document.getElementById("D7S_1g").style.fill = "#141414";
			document.getElementById("D7S_2a").style.fill = "#808080";
			document.getElementById("D7S_2b").style.fill = "#808080";
			document.getElementById("D7S_2c").style.fill = "#141414";
			document.getElementById("D7S_2d").style.fill = "#808080";
			document.getElementById("D7S_2e").style.fill = "#808080";
			document.getElementById("D7S_2f").style.fill = "#808080";
			document.getElementById("D7S_2g").style.fill = "#808080";
			document.getElementById("D7S_3a").style.fill = "#808080";
			document.getElementById("D7S_3b").style.fill = "#808080";
			document.getElementById("D7S_3c").style.fill = "#141414";
			document.getElementById("D7S_3d").style.fill = "#808080";
			document.getElementById("D7S_3e").style.fill = "#808080";
			document.getElementById("D7S_3f").style.fill = "#141414";
			document.getElementById("D7S_3g").style.fill = "#808080";
			document.getElementById("D7S_4b").style.fill = "#808080";
			document.getElementById("D7S_4c").style.fill = "#141414";
			document.getElementById("signo").style.fill = "#808080";
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#808080";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#141414";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";
			break;
		case 8:
			document.getElementById("D7S_1a").style.fill = "#808080";
			document.getElementById("D7S_1b").style.fill = "#808080";
			document.getElementById("D7S_1c").style.fill = "#808080";
			document.getElementById("D7S_1d").style.fill = "#808080";
			document.getElementById("D7S_1e").style.fill = "#808080";
			document.getElementById("D7S_1f").style.fill = "#808080";
			document.getElementById("D7S_1g").style.fill = "#808080";
			document.getElementById("D7S_2a").style.fill = "#808080";
			document.getElementById("D7S_2b").style.fill = "#808080";
			document.getElementById("D7S_2c").style.fill = "#141414";
			document.getElementById("D7S_2d").style.fill = "#808080";
			document.getElementById("D7S_2e").style.fill = "#808080";
			document.getElementById("D7S_2f").style.fill = "#808080";
			document.getElementById("D7S_2g").style.fill = "#808080";
			document.getElementById("D7S_3a").style.fill = "#808080";
			document.getElementById("D7S_3b").style.fill = "#808080";
			document.getElementById("D7S_3c").style.fill = "#141414";
			document.getElementById("D7S_3d").style.fill = "#808080";
			document.getElementById("D7S_3e").style.fill = "#808080";
			document.getElementById("D7S_3f").style.fill = "#808080";
			document.getElementById("D7S_3g").style.fill = "#808080";
			document.getElementById("D7S_4b").style.fill = "#808080";
			document.getElementById("D7S_4c").style.fill = "#141414";
			document.getElementById("signo").style.fill = "#808080";
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#141414";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#141414";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";
			break;
		case 9:
			document.getElementById("D7S_1a").style.fill = "#141414";
			document.getElementById("D7S_1b").style.fill = "#141414";
			document.getElementById("D7S_1c").style.fill = "#141414";
			document.getElementById("D7S_1d").style.fill = "#808080";
			document.getElementById("D7S_1e").style.fill = "#808080";
			document.getElementById("D7S_1f").style.fill = "#808080";
			document.getElementById("D7S_1g").style.fill = "#141414";
			document.getElementById("D7S_2a").style.fill = "#808080";
			document.getElementById("D7S_2b").style.fill = "#808080";
			document.getElementById("D7S_2c").style.fill = "#141414";
			document.getElementById("D7S_2d").style.fill = "#808080";
			document.getElementById("D7S_2e").style.fill = "#808080";
			document.getElementById("D7S_2f").style.fill = "#808080";
			document.getElementById("D7S_2g").style.fill = "#808080";
			document.getElementById("D7S_3a").style.fill = "#808080";
			document.getElementById("D7S_3b").style.fill = "#808080";
			document.getElementById("D7S_3c").style.fill = "#141414";
			document.getElementById("D7S_3d").style.fill = "#808080";
			document.getElementById("D7S_3e").style.fill = "#808080";
			document.getElementById("D7S_3f").style.fill = "#808080";
			document.getElementById("D7S_3g").style.fill = "#141414";
			document.getElementById("D7S_4b").style.fill = "#808080";
			document.getElementById("D7S_4c").style.fill = "#141414";
			document.getElementById("signo").style.fill = "#808080";
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#141414";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#141414";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";
			break;
		case 10:
			document.getElementById("D7S_1a").style.fill = "#808080";
			document.getElementById("D7S_1b").style.fill = "#141414";
			document.getElementById("D7S_1c").style.fill = "#141414";
			document.getElementById("D7S_1d").style.fill = "#808080";
			document.getElementById("D7S_1e").style.fill = "#808080";
			document.getElementById("D7S_1f").style.fill = "#808080";
			document.getElementById("D7S_1g").style.fill = "#808080";
			document.getElementById("D7S_2a").style.fill = "#808080";
			document.getElementById("D7S_2b").style.fill = "#808080";
			document.getElementById("D7S_2c").style.fill = "#141414";
			document.getElementById("D7S_2d").style.fill = "#808080";
			document.getElementById("D7S_2e").style.fill = "#808080";
			document.getElementById("D7S_2f").style.fill = "#808080";
			document.getElementById("D7S_2g").style.fill = "#808080";
			document.getElementById("D7S_3a").style.fill = "#808080";
			document.getElementById("D7S_3b").style.fill = "#808080";
			document.getElementById("D7S_3c").style.fill = "#141414";
			document.getElementById("D7S_3d").style.fill = "#808080";
			document.getElementById("D7S_3e").style.fill = "#808080";
			document.getElementById("D7S_3f").style.fill = "#808080";
			document.getElementById("D7S_3g").style.fill = "#808080";
			document.getElementById("D7S_4b").style.fill = "#141414";
			document.getElementById("D7S_4c").style.fill = "#141414";
			document.getElementById("signo").style.fill = "#808080";
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#141414";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#141414";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";
			break;
		case 11:
			document.getElementById("D7S_1a").style.fill = "#808080";
			document.getElementById("D7S_1b").style.fill = "#141414";
			document.getElementById("D7S_1c").style.fill = "#808080";
			document.getElementById("D7S_1d").style.fill = "#808080";
			document.getElementById("D7S_1e").style.fill = "#808080";
			document.getElementById("D7S_1f").style.fill = "#808080";
			document.getElementById("D7S_1g").style.fill = "#141414";
			document.getElementById("D7S_2a").style.fill = "#808080";
			document.getElementById("D7S_2b").style.fill = "#808080";
			document.getElementById("D7S_2c").style.fill = "#808080";
			document.getElementById("D7S_2d").style.fill = "#808080";
			document.getElementById("D7S_2e").style.fill = "#808080";
			document.getElementById("D7S_2f").style.fill = "#808080";
			document.getElementById("D7S_2g").style.fill = "#808080";
			document.getElementById("D7S_3a").style.fill = "#808080";
			document.getElementById("D7S_3b").style.fill = "#808080";
			document.getElementById("D7S_3c").style.fill = "#141414";
			document.getElementById("D7S_3d").style.fill = "#808080";
			document.getElementById("D7S_3e").style.fill = "#808080";
			document.getElementById("D7S_3f").style.fill = "#808080";
			document.getElementById("D7S_3g").style.fill = "#808080";
			document.getElementById("D7S_4b").style.fill = "#808080";
			document.getElementById("D7S_4c").style.fill = "#141414";
			document.getElementById("signo").style.fill = "#808080";
			document.getElementById("punto1").style.fill = "#141414";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#141414";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#141414";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";
			break;
		case 12:
			document.getElementById("D7S_1a").style.fill = "#808080";
			document.getElementById("D7S_1b").style.fill = "#141414";
			document.getElementById("D7S_1c").style.fill = "#808080";
			document.getElementById("D7S_1d").style.fill = "#808080";
			document.getElementById("D7S_1e").style.fill = "#808080";
			document.getElementById("D7S_1f").style.fill = "#808080";
			document.getElementById("D7S_1g").style.fill = "#808080";
			document.getElementById("D7S_2a").style.fill = "#808080";
			document.getElementById("D7S_2b").style.fill = "#808080";
			document.getElementById("D7S_2c").style.fill = "#141414";
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
			document.getElementById("signo").style.fill = "#808080";
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#141414";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#141414";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";
			break;
		case 13:
			document.getElementById("D7S_1a").style.fill = "#808080";
			document.getElementById("D7S_1b").style.fill = "#808080";
			document.getElementById("D7S_1c").style.fill = "#808080";
			document.getElementById("D7S_1d").style.fill = "#808080";
			document.getElementById("D7S_1e").style.fill = "#808080";
			document.getElementById("D7S_1f").style.fill = "#808080";
			document.getElementById("D7S_1g").style.fill = "#141414";
			document.getElementById("D7S_2a").style.fill = "#808080";
			document.getElementById("D7S_2b").style.fill = "#141414";
			document.getElementById("D7S_2c").style.fill = "#141414";
			document.getElementById("D7S_2d").style.fill = "#808080";
			document.getElementById("D7S_2e").style.fill = "#808080";
			document.getElementById("D7S_2f").style.fill = "#808080";
			document.getElementById("D7S_2g").style.fill = "#808080";
			document.getElementById("D7S_3a").style.fill = "#808080";
			document.getElementById("D7S_3b").style.fill = "#808080";
			document.getElementById("D7S_3c").style.fill = "#141414";
			document.getElementById("D7S_3d").style.fill = "#808080";
			document.getElementById("D7S_3e").style.fill = "#808080";
			document.getElementById("D7S_3f").style.fill = "#808080";
			document.getElementById("D7S_3g").style.fill = "#808080";
			document.getElementById("D7S_4b").style.fill = "#141414";
			document.getElementById("D7S_4c").style.fill = "#141414";
			document.getElementById("signo").style.fill = "#808080";
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#808080";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#141414";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";
			break;
		case 14:
			document.getElementById("D7S_1a").style.fill = "#808080";
			document.getElementById("D7S_1b").style.fill = "#141414";
			document.getElementById("D7S_1c").style.fill = "#141414";
			document.getElementById("D7S_1d").style.fill = "#141414";
			document.getElementById("D7S_1e").style.fill = "#808080";
			document.getElementById("D7S_1f").style.fill = "#808080";
			document.getElementById("D7S_1g").style.fill = "#141414";
			document.getElementById("D7S_2a").style.fill = "#808080";
			document.getElementById("D7S_2b").style.fill = "#808080";
			document.getElementById("D7S_2c").style.fill = "#808080";
			document.getElementById("D7S_2d").style.fill = "#808080";
			document.getElementById("D7S_2e").style.fill = "#808080";
			document.getElementById("D7S_2f").style.fill = "#808080";
			document.getElementById("D7S_2g").style.fill = "#808080";
			document.getElementById("D7S_3a").style.fill = "#808080";
			document.getElementById("D7S_3b").style.fill = "#808080";
			document.getElementById("D7S_3c").style.fill = "#141414";
			document.getElementById("D7S_3d").style.fill = "#808080";
			document.getElementById("D7S_3e").style.fill = "#808080";
			document.getElementById("D7S_3f").style.fill = "#808080";
			document.getElementById("D7S_3g").style.fill = "#141414";
			document.getElementById("D7S_4b").style.fill = "#808080";
			document.getElementById("D7S_4c").style.fill = "#808080";
			document.getElementById("signo").style.fill = "#808080";
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#141414";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#141414";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#141414";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";
			break;
		case 15:
			document.getElementById("D7S_1a").style.fill = "#808080";
			document.getElementById("D7S_1b").style.fill = "#141414";
			document.getElementById("D7S_1c").style.fill = "#808080";
			document.getElementById("D7S_1d").style.fill = "#808080";
			document.getElementById("D7S_1e").style.fill = "#808080";
			document.getElementById("D7S_1f").style.fill = "#808080";
			document.getElementById("D7S_1g").style.fill = "#141414";
			document.getElementById("D7S_2a").style.fill = "#808080";
			document.getElementById("D7S_2b").style.fill = "#808080";
			document.getElementById("D7S_2c").style.fill = "#141414";
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
			document.getElementById("D7S_4b").style.fill = "#808080";
			document.getElementById("D7S_4c").style.fill = "#808080";
			document.getElementById("signo").style.fill = "#808080";
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#141414";
			document.getElementById("punto4").style.fill = "#141414";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#141414";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";
			break;
		case 16:
			document.getElementById("D7S_1a").style.fill = "#808080";
			document.getElementById("D7S_1b").style.fill = "#141414";
			document.getElementById("D7S_1c").style.fill = "#141414";
			document.getElementById("D7S_1d").style.fill = "#808080";
			document.getElementById("D7S_1e").style.fill = "#808080";
			document.getElementById("D7S_1f").style.fill = "#808080";
			document.getElementById("D7S_1g").style.fill = "#141414";
			document.getElementById("D7S_2a").style.fill = "#808080";
			document.getElementById("D7S_2b").style.fill = "#808080";
			document.getElementById("D7S_2c").style.fill = "#141414";
			document.getElementById("D7S_2d").style.fill = "#808080";
			document.getElementById("D7S_2e").style.fill = "#808080";
			document.getElementById("D7S_2f").style.fill = "#808080";
			document.getElementById("D7S_2g").style.fill = "#808080";
			document.getElementById("D7S_3a").style.fill = "#808080";
			document.getElementById("D7S_3b").style.fill = "#808080";
			document.getElementById("D7S_3c").style.fill = "#141414";
			document.getElementById("D7S_3d").style.fill = "#808080";
			document.getElementById("D7S_3e").style.fill = "#808080";
			document.getElementById("D7S_3f").style.fill = "#808080";
			document.getElementById("D7S_3g").style.fill = "#808080";
			document.getElementById("D7S_4b").style.fill = "#808080";
			document.getElementById("D7S_4c").style.fill = "#141414";
			document.getElementById("signo").style.fill = "#808080";
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#808080";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#141414";
			document.getElementById("hfe").style.color = "#141414";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";
			break;
		case 17:
			document.getElementById("D7S_1a").style.fill = "#808080";
			document.getElementById("D7S_1b").style.fill = "#141414";
			document.getElementById("D7S_1c").style.fill = "#141414";
			document.getElementById("D7S_1d").style.fill = "#808080";
			document.getElementById("D7S_1e").style.fill = "#808080";
			document.getElementById("D7S_1f").style.fill = "#808080";
			document.getElementById("D7S_1g").style.fill = "#808080";
			document.getElementById("D7S_2a").style.fill = "#808080";
			document.getElementById("D7S_2b").style.fill = "#808080";
			document.getElementById("D7S_2c").style.fill = "#141414";
			document.getElementById("D7S_2d").style.fill = "#808080";
			document.getElementById("D7S_2e").style.fill = "#808080";
			document.getElementById("D7S_2f").style.fill = "#808080";
			document.getElementById("D7S_2g").style.fill = "#808080";
			document.getElementById("D7S_3a").style.fill = "#808080";
			document.getElementById("D7S_3b").style.fill = "#808080";
			document.getElementById("D7S_3c").style.fill = "#141414";
			document.getElementById("D7S_3d").style.fill = "#141414";
			document.getElementById("D7S_3e").style.fill = "#808080";
			document.getElementById("D7S_3f").style.fill = "#808080";
			document.getElementById("D7S_3g").style.fill = "#808080";
			document.getElementById("D7S_4b").style.fill = "#808080";
			document.getElementById("D7S_4c").style.fill = "#141414";
			document.getElementById("signo").style.fill = "#808080";
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#141414";
			document.getElementById("punto3").style.fill = "#808080";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#141414";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";
			break;
		case 18:
			document.getElementById("D7S_1a").style.fill = "#808080";
			document.getElementById("D7S_1b").style.fill = "#141414";
			document.getElementById("D7S_1c").style.fill = "#141414";
			document.getElementById("D7S_1d").style.fill = "#808080";
			document.getElementById("D7S_1e").style.fill = "#808080";
			document.getElementById("D7S_1f").style.fill = "#808080";
			document.getElementById("D7S_1g").style.fill = "#808080";
			document.getElementById("D7S_2a").style.fill = "#808080";
			document.getElementById("D7S_2b").style.fill = "#808080";
			document.getElementById("D7S_2c").style.fill = "#141414";
			document.getElementById("D7S_2d").style.fill = "#141414";
			document.getElementById("D7S_2e").style.fill = "#808080";
			document.getElementById("D7S_2f").style.fill = "#808080";
			document.getElementById("D7S_2g").style.fill = "#808080";
			document.getElementById("D7S_3a").style.fill = "#808080";
			document.getElementById("D7S_3b").style.fill = "#808080";
			document.getElementById("D7S_3c").style.fill = "#141414";
			document.getElementById("D7S_3d").style.fill = "#808080";
			document.getElementById("D7S_3e").style.fill = "#808080";
			document.getElementById("D7S_3f").style.fill = "#808080";
			document.getElementById("D7S_3g").style.fill = "#808080";
			document.getElementById("D7S_4b").style.fill = "#808080";
			document.getElementById("D7S_4c").style.fill = "#141414";
			document.getElementById("signo").style.fill = "#808080";
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#141414";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#141414";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#141414";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";
			break;
		case 19:
			document.getElementById("D7S_1a").style.fill = "#808080";
			document.getElementById("D7S_1b").style.fill = "#808080";
			document.getElementById("D7S_1c").style.fill = "#141414";
			document.getElementById("D7S_1d").style.fill = "#808080";
			document.getElementById("D7S_1e").style.fill = "#808080";
			document.getElementById("D7S_1f").style.fill = "#808080";
			document.getElementById("D7S_1g").style.fill = "#141414";
			document.getElementById("D7S_2a").style.fill = "#141414";
			document.getElementById("D7S_2b").style.fill = "#808080";
			document.getElementById("D7S_2c").style.fill = "#141414";
			document.getElementById("D7S_2d").style.fill = "#808080";
			document.getElementById("D7S_2e").style.fill = "#808080";
			document.getElementById("D7S_2f").style.fill = "#808080";
			document.getElementById("D7S_2g").style.fill = "#808080";
			document.getElementById("D7S_3a").style.fill = "#141414";
			document.getElementById("D7S_3b").style.fill = "#808080";
			document.getElementById("D7S_3c").style.fill = "#808080";
			document.getElementById("D7S_3d").style.fill = "#808080";
			document.getElementById("D7S_3e").style.fill = "#808080";
			document.getElementById("D7S_3f").style.fill = "#808080";
			document.getElementById("D7S_3g").style.fill = "#808080";
			document.getElementById("D7S_4b").style.fill = "#808080";
			document.getElementById("D7S_4c").style.fill = "#141414";
			document.getElementById("signo").style.fill = "#808080";
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#141414";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#141414";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#141414";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";
			break;
		case 20:
			document.getElementById("D7S_1a").style.fill = "#808080";
			document.getElementById("D7S_1b").style.fill = "#141414";
			document.getElementById("D7S_1c").style.fill = "#808080";
			document.getElementById("D7S_1d").style.fill = "#808080";
			document.getElementById("D7S_1e").style.fill = "#808080";
			document.getElementById("D7S_1f").style.fill = "#808080";
			document.getElementById("D7S_1g").style.fill = "#141414";
			document.getElementById("D7S_2a").style.fill = "#808080";
			document.getElementById("D7S_2b").style.fill = "#808080";
			document.getElementById("D7S_2c").style.fill = "#141414";
			document.getElementById("D7S_2d").style.fill = "#808080";
			document.getElementById("D7S_2e").style.fill = "#141414";
			document.getElementById("D7S_2f").style.fill = "#808080";
			document.getElementById("D7S_2g").style.fill = "#808080";
			document.getElementById("D7S_3a").style.fill = "#808080";
			document.getElementById("D7S_3b").style.fill = "#808080";
			document.getElementById("D7S_3c").style.fill = "#141414";
			document.getElementById("D7S_3d").style.fill = "#808080";
			document.getElementById("D7S_3e").style.fill = "#808080";
			document.getElementById("D7S_3f").style.fill = "#808080";
			document.getElementById("D7S_3g").style.fill = "#808080";
			document.getElementById("D7S_4b").style.fill = "#808080";
			document.getElementById("D7S_4c").style.fill = "#141414";
			document.getElementById("signo").style.fill = "#808080";
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#141414";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#141414";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#141414";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";
			break;
		case 21:
			document.getElementById("D7S_1a").style.fill = "#808080";
			document.getElementById("D7S_1b").style.fill = "#808080";
			document.getElementById("D7S_1c").style.fill = "#141414";
			document.getElementById("D7S_1d").style.fill = "#808080";
			document.getElementById("D7S_1e").style.fill = "#141414";
			document.getElementById("D7S_1f").style.fill = "#808080";
			document.getElementById("D7S_1g").style.fill = "#141414";
			document.getElementById("D7S_2a").style.fill = "#808080";
			document.getElementById("D7S_2b").style.fill = "#808080";
			document.getElementById("D7S_2c").style.fill = "#141414";
			document.getElementById("D7S_2d").style.fill = "#808080";
			document.getElementById("D7S_2e").style.fill = "#808080";
			document.getElementById("D7S_2f").style.fill = "#808080";
			document.getElementById("D7S_2g").style.fill = "#808080";
			document.getElementById("D7S_3a").style.fill = "#808080";
			document.getElementById("D7S_3b").style.fill = "#808080";
			document.getElementById("D7S_3c").style.fill = "#141414";
			document.getElementById("D7S_3d").style.fill = "#808080";
			document.getElementById("D7S_3e").style.fill = "#808080";
			document.getElementById("D7S_3f").style.fill = "#808080";
			document.getElementById("D7S_3g").style.fill = "#808080";
			document.getElementById("D7S_4b").style.fill = "#808080";
			document.getElementById("D7S_4c").style.fill = "#141414";
			document.getElementById("signo").style.fill = "#808080";
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#141414";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#141414";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";
			break;
		case 22: 
			document.getElementById("D7S_1a").style.fill = "#808080";
			document.getElementById("D7S_1b").style.fill = "#141414";
			document.getElementById("D7S_1c").style.fill = "#141414";
			document.getElementById("D7S_1d").style.fill = "#808080";
			document.getElementById("D7S_1e").style.fill = "#808080";
			document.getElementById("D7S_1f").style.fill = "#808080";
			document.getElementById("D7S_1g").style.fill = "#141414";
			document.getElementById("D7S_2a").style.fill = "#808080";
			document.getElementById("D7S_2b").style.fill = "#808080";
			document.getElementById("D7S_2c").style.fill = "#141414";
			document.getElementById("D7S_2d").style.fill = "#808080";
			document.getElementById("D7S_2e").style.fill = "#808080";
			document.getElementById("D7S_2f").style.fill = "#808080";
			document.getElementById("D7S_2g").style.fill = "#808080";
			document.getElementById("D7S_3a").style.fill = "#808080";
			document.getElementById("D7S_3b").style.fill = "#141414";
			document.getElementById("D7S_3c").style.fill = "#141414";
			document.getElementById("D7S_3d").style.fill = "#808080";
			document.getElementById("D7S_3e").style.fill = "#808080";
			document.getElementById("D7S_3f").style.fill = "#808080";
			document.getElementById("D7S_3g").style.fill = "#808080";
			document.getElementById("D7S_4b").style.fill = "#808080";
			document.getElementById("D7S_4c").style.fill = "#141414";
			document.getElementById("signo").style.fill = "#808080";
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#808080";
			document.getElementById("punto4").style.fill = "#808080";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#141414";
			document.getElementById("hfe").style.color = "#141414";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";
			break;
		case 23:
			document.getElementById("D7S_1a").style.fill = "#808080";
			document.getElementById("D7S_1b").style.fill = "#141414";
			document.getElementById("D7S_1c").style.fill = "#141414";
			document.getElementById("D7S_1d").style.fill = "#808080";
			document.getElementById("D7S_1e").style.fill = "#808080";
			document.getElementById("D7S_1f").style.fill = "#808080";
			document.getElementById("D7S_1g").style.fill = "#141414";
			document.getElementById("D7S_2a").style.fill = "#808080";
			document.getElementById("D7S_2b").style.fill = "#808080";
			document.getElementById("D7S_2c").style.fill = "#141414";
			document.getElementById("D7S_2d").style.fill = "#808080";
			document.getElementById("D7S_2e").style.fill = "#808080";
			document.getElementById("D7S_2f").style.fill = "#141414";
			document.getElementById("D7S_2g").style.fill = "#808080";
			document.getElementById("D7S_3a").style.fill = "#808080";
			document.getElementById("D7S_3b").style.fill = "#808080";
			document.getElementById("D7S_3c").style.fill = "#808080";
			document.getElementById("D7S_3d").style.fill = "#808080";
			document.getElementById("D7S_3e").style.fill = "#808080";
			document.getElementById("D7S_3f").style.fill = "#808080";
			document.getElementById("D7S_3g").style.fill = "#808080";
			document.getElementById("D7S_4b").style.fill = "#808080";
			document.getElementById("D7S_4c").style.fill = "#141414";
			document.getElementById("signo").style.fill = "#808080";
			document.getElementById("punto1").style.fill = "#808080";
			document.getElementById("punto2").style.fill = "#808080";
			document.getElementById("punto3").style.fill = "#141414";
			document.getElementById("punto4").style.fill = "#141414";
			document.getElementById("ohmios").style.color = "#808080";
			document.getElementById("kiloohmios").style.color = "#808080";
			document.getElementById("megaohmios").style.color = "#808080";
			document.getElementById("voltios").style.color = "#808080";
			document.getElementById("milivoltios").style.color = "#141414";
			document.getElementById("hfe").style.color = "#808080";
			document.getElementById("miliamperios").style.color = "#808080";
			document.getElementById("microamperios").style.color = "#808080";
			document.getElementById("AC").style.color = "#808080";
			break;
		default:
			alert("Assert linha 4369");
			break;
	}
}