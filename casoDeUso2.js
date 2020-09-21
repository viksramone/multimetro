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

	var valorMedido;
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
			potenciaReceptor = 1500;

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
			potenciaReceptor = 145;
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
	//console.clear();
	//console.log("button:" + event.button);
	//console.log("which:" + event.which);

	if (indicePosicionSelector == 0 && event.deltaY < 0)
	{
		indicePosicionSelector = 23;
		
		enciende_multimetro();
		//console.log("Multímetro encendido");
	}
	
	else if (indicePosicionSelector == 0 && event.deltaY > 0)
	{
		indicePosicionSelector = 1;
		
		enciende_multimetro();
		//console.log("Multímetro encendido");
	}
	
	else if (indicePosicionSelector == 23 && event.deltaY > 0)
	{
		indicePosicionSelector = 0;
		apaga_multimetro();
		//console.log("Multímetro apagado");
	}
	
	else if (indicePosicionSelector == 1 && event.deltaY < 0)
	{
		indicePosicionSelector = 0;
		apaga_multimetro();
		//console.log("Multímetro apagado");
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
			//console.log("Assert línea 287");
		}
	}

	document.getElementById("selector").src = posicionSelector[indicePosicionSelector];
	//console.log("posición del selector:" + indicePosicionSelector);

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
	//console.log("Obtenemos características de la posición del selector (magnitud, tipo y rango)");

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
			document.getElementById("miliamperios").style.color = "#808080";
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
	//console.log("Seleccionamos sonda roja");

	posicionXSondaRoja = e.pageX - sondaRojaElement.offsetLeft;
	posicionYSondaRoja = e.pageY - sondaRojaElement.offsetTop;	
	
	addEventListener("mousemove", dragMoveSondaRoja);
	addEventListener("mouseup", dragEndSondaRoja);
}
//-----------------------------------------------------------------------------------------------------------------------
function dragMoveSondaRoja(e)
{
	//console.log("Desplazamos sonda roja");

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
	//console.log("Liberamos sonda roja");

	if ((sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) > 485
			&& (sondaRojaElement.style.left.substring(0,sondaRojaElement.style.left.length-2)) < 505
				&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) > 210
					&& (sondaRojaElement.style.top.substring(0,sondaRojaElement.style.top.length-2)) < 240)
	{
		sondaRojaElement.style.left = "498px";
		sondaRojaElement.style.top = "217px";
		//console.log("Sonda Roja conectada a neutro");
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
		//console.log("Sonda Roja conectada a fase");
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
		//console.log("Sonda Roja conectada a fase");
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
		//console.log("Sonda Roja conectada a fase");
		sondaRojaConectadaARegletaFase1 = false;
		sondaRojaConectadaARegletaFase2 = true;
		document.getElementById('aspaRojaPaso6').style.backgroundImage = "url('./images/aspaVerde.png')";
		document.getElementById('regletaPuenteFase2').style.fill = "transparent";
	}
	else
	{
	//console.log("Sonda Roja desconectada");
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
	//console.log("Seleccionamos sonda negra");
	posicionXSondaNegra = e.pageX - sondaNegraElement.offsetLeft;
	posicionYSondaNegra = e.pageY - sondaNegraElement.offsetTop;	
	addEventListener("mousemove", dragMoveSondaNegra);
	addEventListener("mouseup", dragEndSondaNegra);
}

//-----------------------------------------------------------------------------------------------------------------------
function dragMoveSondaNegra(e)
{
	//console.log("Desplazamos sonda negra");
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
	//console.log("Liberamos sonda negra");
	
	if ((sondaNegraElement.style.left.substring(0,sondaNegraElement.style.left.length-2)) > 485
			&& (sondaNegraElement.style.left.substring(0,sondaNegraElement.style.left.length-2)) < 505
				&& (sondaNegraElement.style.top.substring(0,sondaNegraElement.style.top.length-2)) > 210
					&& (sondaNegraElement.style.top.substring(0,sondaNegraElement.style.top.length-2)) < 240)
	{
		sondaNegraElement.style.left = "498px";
		sondaNegraElement.style.top = "217px";
		//console.log("Sonda Negra conectada a neutro");
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
		//console.log("Sonda Negra conectada a fase");
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
		//console.log("Sonda Negra conectada a fase");
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
		//console.log("Sonda Negra conectada a fase");
		sondaNegraConectadaARegletaFase1 = false;
		sondaNegraConectadaARegletaFase2 = true;
		document.getElementById('aspaRojaPaso5').style.backgroundImage = "url('./images/aspaVerde.png')";
		document.getElementById('regletaPuenteFase2').style.fill = "transparent";
	}
	else
	{
	//console.log("Sonda Negra desconectada");
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
	//console.log("Seleccionamos conector rojo");

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
	//console.log("Desplazamos conector rojo");

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
	//console.log("Liberamos conector rojo");

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
		//console.log("Conector Rojo conectado a puerto A10");
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
		//console.log("Conector Rojo conectado a puerto VRA");
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
		//console.log("Conector Rojo conectado a puerto COM");
		document.getElementById('aspaRojaPaso2').style.backgroundImage = "url('./images/aspaRoja.png')";
		conectorRojoConectadoA10A = false;
		conectorRojoConectadoAVRA = false;
		conectorRojoConectadoACOM = true;
	}
	else
	{
		//console.log("Conector rojo desconectado");
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
	//console.log("Seleccionamos conector negro");

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
	//console.log("Desplazamos conector negro");

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
	//console.log("Liberamos conector negro");

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
		//console.log("Conector Negro conectado a puerto 10A");
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
		//console.log("Conector Negro conectado a puerto VRA");
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
		//console.log("Conector Negro conectado a puerto COM");
		document.getElementById('aspaRojaPaso1').style.backgroundImage = "url('./images/aspaVerde.png')";
		conectorNegroConectadoA10A = false;
		conectorNegroConectadoAVRA = false;
		conectorNegroConectadoACOM = true;
	}
	else
	{
		//console.log("Conector negro desconectado");
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
		//console.log("Puente neutro conectado");
		if 	(puenteFaseConectadoARegleta == true)
			document.getElementById('aspaRojaPaso4').style.backgroundImage = "url('./images/aspaRoja.png')";
		else
			document.getElementById('aspaRojaPaso4').style.backgroundImage = "url('./images/aspaVerde.png')";
		puenteNeutroConectadoARegleta = true;
	}
	else
	{
		//console.log("Puente Neutro desconectado");
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

	//console.log(puenteFaseElement.style.left);
		//console.log(puenteFaseElement.style.top);
	
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
		//console.log("Puenta fase conectado a la regleta");
		if (puenteNeutroConectadoARegleta == true)
			document.getElementById('aspaRojaPaso4').style.backgroundImage = "url('./images/aspaRoja.png')";
		else
			document.getElementById('aspaRojaPaso4').style.backgroundImage = "url('./images/aspaVerde.png')";
		puenteFaseConectadoARegleta = true;

	}
	else
	{
		//console.log("Puente fase desconectado");
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

	if (conectorRojoConectadoAVRA == false && conectorNegroConectadoAVRA == false 
		&& conectorRojoConectadoACOM == false && conectorNegroConectadoACOM == false
		&& conectorRojoConectadoA10A == false && conectorNegroConectadoA10A == false)
	{
		//console.log("Analiza la conexiones de los bornes: Sondas desconectadas");
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
		//console.log("Analiza la conexiones de los bornes: Sondas conectadas para medir voltajes DC/AC, intensidades de mA en DC/AC, continuidad y resistencia");
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
		//console.log("Analiza la conexiones de los bornes: Sondas conectadas para medir voltajes DC/AC, intensidades de mA en DC/AC, continuidad y resistencia");
		sondasDesconectadas = false;
		
		configuracionMedicionVoltaje = false;
		configuracionMedicionIntensidadmA = false;
		configuracionMedicionIntensidad10A = true;
		configuracionMedicionContinuidad = false;
		configuracionMedicionResistencia = false;
	}
	else
	{
		//console.log("Analiza la conexiones de los bornes: Configuración de sondas incompleta");
		sondasDesconectadas = true;

		configuracionMedicionVoltaje = false;
		configuracionMedicionIntensidadmA = false;
		configuracionMedicionIntensidad10A = false;
		configuracionMedicionContinuidad = false;
		configuracionMedicionResistencia = false;
	}
}
//-----------------------------------------------------------------------------------------------------------------------
function analizaConexionDePuntas()
{
	if ((sondaRojaConectadaARegletaNeutro1 == false && sondaRojaConectadaARegletaNeutro2 == false
		&& sondaRojaConectadaARegletaFase1 == false && sondaRojaConectadaARegletaFase2 == false)
		|| (sondaNegraConectadaARegletaNeutro1 == false && sondaNegraConectadaARegletaNeutro2 == false
		&& sondaNegraConectadaARegletaFase1 == false && sondaNegraConectadaARegletaFase2 == false))
	{
		//console.log("Analiza la conexiones de las puntas: hay alguna punta desconectada");
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
		//console.log("Analiza la conexiones de las puntas: las puntas están conectadas entre Neutro y Fase de la regleta 1");
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
		//console.log("Analiza la conexiones de las puntas: las puntas están conectadas entre Neutro y Fase de la regleta 2");
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
		//console.log("Analiza la conexiones de las puntas: las puntas están conectadas entre Neutro de la regleta 1 y Fase de la regleta 2");
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
		//console.log("Analiza la conexiones de las puntas: las puntas están conectadas entre Neutro de la regleta 2 y Fase de la regleta 1");
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
		//console.log("Analiza la conexiones de las puntas: las puntas están conectadas a un mismo punto");
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
		//console.log("Analiza la conexiones de las puntas: las puntas están conectadas entre las fases de las regleta 1 y 2");
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
		//console.log("Analiza la conexiones de las puntas: las puntas están conectadas entre los neutros de las regletas 1 y 2");
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
		//console.log("Analiza la conexiones de las puntas: Conexión de puntas desconocida");
	}

}

//-----------------------------------------------------------------------------------------------------------------------
function analizaConexionDePuentes()
{	
	if (puenteFaseConectadoARegleta == true)
	{
		//console.log("Analiza la conexiones de los puentes: el puente de fase está conectado");
	}
	else
	{
		//console.log("Analiza la conexiones de los puentes: el puente de fase está desconectado");	
	}

	if (puenteNeutroConectadoARegleta == true)
	{
		//console.log("Analiza la conexiones de los puentes: el puente de neutro está conectado");
	}
	else
	{
		//console.log("Analiza la conexiones de los puentes: el puente de neutro está desconectado");	
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

			document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaRoja.png')";
			//console.log("Multímetro apagado.");

			tipoDeMedicion = 'MULTIMETRO_APAGADO';

			if (puenteNeutroConectadoARegleta == true && puenteFaseConectadoARegleta == true)
			{
				conexionCorrectaParaReceptor = true;
			}
			else
			{
				conexionCorrectaParaReceptor = false;
			}
			break;

		case 1: case 2: case 3: case 4: case 5: //VOLTAJE_DC
			
			document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaRoja.png')";
			//console.log("Medimos voltaje DC en un caso de uso de AC (10A).");
			
			if (sondasDesconectadas == true)
			{
				//console.log ("Sondas desconectadas: obtenemos una pequeña variación de mV debida al ruido que capta el aparato de medida.");
				tipoDeMedicion = 'MEDICION_INCORRECTA_RUIDO_BLANCO';
				
				clearInterval(oscilacionValorMedidoVoltaje);
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
				//console.log ("Sondas conectadas y alguna punta al aire: obtenemos una pequeña de variación de mV debida al ruido que capta el multímetro, algo mayor que si las sondas estuvieran desconectadas.");
				tipoDeMedicion = 'MEDICION_INCORRECTA_RUIDO_BLANCO';
				
				clearInterval(oscilacionValorMedidoVoltaje);
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
				//console.log ("Puntas desconectadas: sin medida sensible de aparecer en pantalla.");
				tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
				
				clearInterval(oscilacionValorMedidoVoltaje);
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
					|| (conexionEntreNeutroRegleta2YFaseRegleta2 == true && puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true))
				{
					//console.log("Sondas conectadas y puntas entre Fase y Neutro, ya sea en la regleta 1 o en la regleta 2");
					tipoDeMedicion = "CONFIGURACION_VRA_VOLTAJE_DC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";//VOLTAJE_DC_ENTRE_DOS_PUNTOS_DESCONECTADOS_AC

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
					//console.log("Sondas conectadas y puntas entre Fase y Neutro en la regleta 2, con los puentes desconectados");
					tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

					conexionCorrectaParaReceptor = false;
				}
				
				else if (conexionEntreFaseRegleta1YFaseRegleta2 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						if (puenteFaseConectadoARegleta == true)
						{
							//console.log("Sondas conectadas y puntas entre fases puenteadas");
							tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

							conexionCorrectaParaReceptor = true;
						}
						else
						{
							//console.log("Sondas conectadas y puntas entre fases sin continuidad entre ellas");
							tipoDeMedicion = "CONFIGURACION_VRA_VOLTAJE_DC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC";//VOLTAJE_DC_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC

							conexionCorrectaParaReceptor = false;
						}
					}
					else
					{
						//console.log("Camino de vuelta cortado.");
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
							//console.log("Sondas conectadas y puntas entre neutros puenteados");
							tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

							conexionCorrectaParaReceptor = true;
						}
						else
						{
							//console.log("Sondas conectadas y puntas entre neutros sin continuidad entre ellos");
							tipoDeMedicion = "CONFIGURACION_VRA_VOLTAJE_DC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC";//Pendiente revisar con Pere ¿Depende del estado del receptor?

							conexionCorrectaParaReceptor = false;
						}
					}
					else
					{
						//console.log("Camino de vuelta cortado.");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = false;
					}
				}
				else if (conexionEntreNeutroRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						//console.log("Sondas conectadas y puntas entre Fase y Neutro en diferentes regletas");
						tipoDeMedicion = "CONFIGURACION_VRA_VOLTAJE_DC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";					

						if (puenteNeutroConectadoARegleta == true)
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
						//console.log("Configuración sin solución de continuidad.");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = false;
					}
				}
				else if (conexionEntreNeutroRegleta2YFaseRegleta1 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						//console.log("Sondas conectadas y puntas entre Fase y Neutro en diferentes regletas");
						tipoDeMedicion = "CONFIGURACION_VRA_VOLTAJE_DC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";

						if (puenteFaseConectadoARegleta == true)							
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
						//console.log("Configuración sin solución de continuidad.");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = false;
					}
				}
				else if (conexionDeSondasAMismoPunto == true)
				{
						//console.log("Sondas conectadas entre ellas.");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = true;
				}
			}
			else if (sondasDesconectadas == false && configuracionMedicionIntensidad10A == true && conexionDePuntasIncompleta == false)
			{
				if ((conexionEntreNeutroRegleta1YFaseRegleta1 == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta2 == true && puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true))
				{
					//console.log("Sondas conectadas y puntas entre Fase y Neutro, ya sea en la regleta 1 o en la regleta 2");
					tipoDeMedicion = "CONFIGURACION_10A_VOLTAJE_DC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC"; //INTENSIDAD_AC_ENTRE_DOS_PUNTOS_A_DIFERENTE_POTENCIAL_AC -> INTENSIDAD_10A_ENTRE_FASE_Y_NEUTRO_AC

					if (puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
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
					//console.log("Sondas conectadas y puntas entre Fase y Neutro en la regleta 2, con los puentes desconectados");
					tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

					conexionCorrectaParaReceptor = false;
				}
				else if (conexionEntreFaseRegleta1YFaseRegleta2 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						if (puenteFaseConectadoARegleta == true)
						{
							//console.log("Sondas conectadas y puntas entre fases puenteadas");
							tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

							conexionCorrectaParaReceptor = true;
						}
						else
						{
							//console.log("Sondas conectadas y puntas entre fases sin continuidad entre ellas");
							tipoDeMedicion = "CONFIGURACION_10A_VOLTAJE_DC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC"; // --> INTENSIDAD_10A_ENTRE_FASE_Y_FASE_A_TRAVES_DE_RECEPTOR_AC

							conexionCorrectaParaReceptor = false;
						}
					}
					else
					{
						//console.log("Camino de vuelta cortado.");
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
							//console.log("Sondas conectadas y puntas entre neutros puenteados");
							tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

							conexionCorrectaParaReceptor = true;
						}
						else
						{
							//console.log("Sondas conectadas y puntas entre neutros sin continuidad entre ellos");
							tipoDeMedicion = "CONFIGURACION_10A_VOLTAJE_DC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC";

							conexionCorrectaParaReceptor = false;
						}
					}
					else
					{
						//console.log("Camino de vuelta cortado.");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = false;
					}
				}
				else if (conexionEntreNeutroRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						//console.log("Sondas conectadas y puntas entre Fase y Neutro en diferentes regletas");
						tipoDeMedicion = "CONFIGURACION_10A_VOLTAJE_DC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";

						if (puenteNeutroConectadoARegleta == true)
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
						//console.log("Configuración sin solución de continuidad");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = false;
					}
				}
				else if (conexionEntreNeutroRegleta2YFaseRegleta1 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						//console.log("Sondas conectadas y puntas entre Fase y Neutro en diferentes regletas");
						tipoDeMedicion = "CONFIGURACION_10A_VOLTAJE_DC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";

						if (puenteFaseConectadoARegleta == true)
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
						//console.log("Configuración sin solución de continuidad");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = false;
					}
				}
				else if (conexionDeSondasAMismoPunto == true)
				{
						//console.log("Sondas conectadas entre ellas.");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = true;
				}
			}
			else
			{
			//{console.log("Assert linha 3048");
			}
			break;
		
		case 6: case 7: case 8: case 9: //VOLTAJE AC
			
			document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaRoja.png')";
			//console.log("Medimos voltaje AC en caso de uso AC");
			
			if (sondasDesconectadas == true)
			{
				//console.log ("Sondas desconectadas: obtenemos una pequeña variación de mV debida al ruido que capta el aparato de medida.");
				tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
				
				clearInterval(oscilacionValorMedidoVoltaje);
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
			
			else if (sondasDesconectadas == false && conexionDePuntasIncompleta == true)
			{
				tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
				//console.log ("Sondas conectadas y alguna punta al aire: obtenemos una pequeña de variación de mV debida al ruido que capta el multímetro, algo mayor que si las sondas estuvieran desconectadas.");
				
				clearInterval(oscilacionValorMedidoVoltaje);
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
					|| (conexionEntreNeutroRegleta2YFaseRegleta2 == true && puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true))
				{
					//console.log("Sondas conectadas y puntas entre Fase y Neutro, ya sea en la regleta 1 o en la regleta 2");
					tipoDeMedicion = "CONFIGURACION_VRA_VOLTAJE_AC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC"; //VOLTAJE_AC_ENTRE_FASE_Y_NEUTRO_AC

					if (puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
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
					//console.log("Sondas conectadas y puntas entre Fase y Neutro en la regleta 2, con los puentes desconectados");
					tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
					
					clearInterval(oscilacionValorMedidoVoltaje);
					clearInterval(oscilacionValorMedidoIntensidadmA);
					clearInterval(oscilacionValorMedidoIntensidad10A);
					
					oscilacionValorMedidoVoltaje = undefined;
					oscilacionValorMedidoIntensidadmA = undefined;
					
					conexionCorrectaParaReceptor = false;
				}
				
				else if (conexionEntreFaseRegleta1YFaseRegleta2 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						if (puenteFaseConectadoARegleta == true)
						{
							//console.log("Sondas conectadas y puntas entre fases puenteadas");
							clearInterval(oscilacionValorMedidoVoltaje);
							tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
							
							conexionCorrectaParaReceptor = true;
						}
						else
						{
							if (receptorActivoSecador == false && receptorActivoCadena == false && receptorActivoEstufa == false)
							{
								clearInterval(oscilacionValorMedidoVoltaje);
								tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";							
							}
							else
							{
								//console.log("Sondas conectadas y puntas entre fases sin continuidad entre ellas");
								clearInterval(oscilacionValorMedidoVoltaje);
								tipoDeMedicion = "CONFIGURACION_VRA_VOLTAJE_AC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC";
							}

							conexionCorrectaParaReceptor = false;
						}
					}
					else
					{
						//console.log("Camino de vuelta cortado.");
						clearInterval(oscilacionValorMedidoVoltaje);
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
							//console.log("Sondas conectadas y puntas entre neutros puenteados");
							clearInterval(oscilacionValorMedidoVoltaje);
							tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
							
							conexionCorrectaParaReceptor = true;
						}
						else
						{
							if (receptorActivoSecador == false && receptorActivoCadena == false && receptorActivoEstufa == false)
							{
								clearInterval(oscilacionValorMedidoVoltaje);
								tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
							}
							else
							{
								//console.log("Sondas conectadas y puntas entre neutros sin continuidad entre ellas");
								clearInterval(oscilacionValorMedidoVoltaje);
								tipoDeMedicion = "CONFIGURACION_VRA_VOLTAJE_AC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC";
							}
							
							conexionCorrectaParaReceptor = false;
						}
					}
					else
					{
						//console.log("Camino de vuelta cortado.");
						clearInterval(oscilacionValorMedidoVoltaje);
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = false;
					}
				}
				else if (conexionEntreNeutroRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						//console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "CONFIGURACION_VRA_VOLTAJE_AC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";
						
							if (puenteNeutroConectadoARegleta == true)
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
						//console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
						
						conexionCorrectaParaReceptor = false;
						
						clearInterval(oscilacionValorMedidoVoltaje);
						oscilacionValorMedidoVoltaje = undefined;
						
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
						//console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "CONFIGURACION_VRA_VOLTAJE_AC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";
						
						if (puenteFaseConectadoARegleta == true)
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
						//console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
						
						conexionCorrectaParaReceptor = false;
						
						clearInterval(oscilacionValorMedidoVoltaje);
						oscilacionValorMedidoVoltaje = undefined;
						
						clearInterval(oscilacionValorMedidoIntensidadmA);
						oscilacionValorMedidoIntensidadmA = undefined;
						
						clearInterval(oscilacionValorMedidoIntensidad10A);
						oscilacionValorMedidoIntensidad10A = undefined;
					}
				}
				else if (conexionDeSondasAMismoPunto == true)
				{
					tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
					conexionCorrectaParaReceptor = true;
				}
			}
			else if (sondasDesconectadas == false && configuracionMedicionIntensidad10A == true && conexionDePuntasIncompleta == false)
			{
				if ((conexionEntreNeutroRegleta1YFaseRegleta1 == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta2 == true && puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true))
				{
					//console.log("Sondas conectadas y puntas entre Fase y Neutro");
					tipoDeMedicion = "CONFIGURACION_10A_VOLTAJE_AC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";

					if (puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
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
					//console.log("Puentes desconectados");
					tipoDeMedicion ="MEDICION_INCORRECTA_DEVUELVE_CERO";

					conexionCorrectaParaReceptor = false;
				}
				else if (conexionEntreFaseRegleta1YFaseRegleta2 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						if (puenteFaseConectadoARegleta == true)
						{
							//console.log("Sondas conectadas y puntas entre fases puenteadas");
							tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

							conexionCorrectaParaReceptor = true;
						}
						else
						{
							//console.log("Sondas conectadas y puntas entre fases aisladas");
							tipoDeMedicion = "CONFIGURACION_10A_VOLTAJE_AC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC"; //INTENSIDAD_10A_ENTRE_FASE_Y_FASE__O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC
						}
					}
					else
					{
						//console.log("Camino de vuelta cortado.");
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
							//console.log("Sondas conectadas y puntas entre neutros puenteados");
							tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

							conexionCorrectaParaReceptor = true;			
						}
						else
						{
							//console.log("Sondas conectadas y puntas entre neutros aislados");
							tipoDeMedicion = "CONFIGURACION_10A_VOLTAJE_AC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC";

							conexionCorrectaParaReceptor = false;
						}
					}
					else
					{
						//console.log("Camino de vuelta cortado.");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = false;
					}
				}
				else if (conexionEntreNeutroRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						//console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "CONFIGURACION_10A_VOLTAJE_AC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";

						if (puenteNeutroConectadoARegleta == true)
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
						//console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = false;
					}
				}
				else if (conexionEntreNeutroRegleta2YFaseRegleta1 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						//console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "CONFIGURACION_10A_VOLTAJE_AC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";

						if (puenteFaseConectadoARegleta == true)
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
						//console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = false;
					}
				}
				else if (conexionDeSondasAMismoPunto == true)
				{
						//console.log("Sondas conectadas entre ellas.");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = true;
				}
			}
			
			else
			{
				//console.log("Assert linha 3370");
			}
			break;

		case 10:
			
			document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaRoja.png')";
			//console.log("Medimos hfe");
		
			break;
		
		case 11: case 13:
		
			document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaRoja.png')";
			//console.log("Medimos intensidad AC en caso de uso AC");
		
			if (sondasDesconectadas == true)
			{
				//console.log("Sondas desconectadas");
				tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
		
				clearInterval(oscilacionValorMedidoVoltaje);
				clearInterval(oscilacionValorMedidoIntensidadmA);
				clearInterval(oscilacionValorMedidoIntensidad10A);
			}
			
			else if (sondasDesconectadas == false && conexionDePuntasIncompleta == true)
			{
				//console.log("Sondas conectadas pero por lo menos una punta desconetada");
				tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
		
				clearInterval(oscilacionValorMedidoVoltaje);
				clearInterval(oscilacionValorMedidoIntensidadmA);
				clearInterval(oscilacionValorMedidoIntensidad10A);
			}
			
			else if (sondasDesconectadas == false && configuracionMedicionIntensidadmA == true && conexionDePuntasIncompleta == false)
			{
				if ((conexionEntreNeutroRegleta1YFaseRegleta1 == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta2 == true && puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true))
				{
					//console.log("Sondas conectadas y puntas entre Fase y Neutro");
					tipoDeMedicion = "CONFIGURACION_mA_INTENSIDAD_mA_AC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";

					if (puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
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
					//console.log("Puentes desconectados");
					tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

					conexionCorrectaParaReceptor = false;
				}

				else if (conexionEntreFaseRegleta1YFaseRegleta2 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						if (puenteFaseConectadoARegleta == true)
						{
							//console.log("Sondas conectadas y puntas entre fases puenteadas");
							
							tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
							conexionCorrectaParaReceptor = true;
						}
						else
						{
							//console.log("Sondas conectadas y puntas entre fases aisladas");
							
							tipoDeMedicion = "CONFIGURACION_mA_INTENSIDAD_mA_AC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC";
							conexionCorrectaParaReceptor = true;
						}
					}
					
					else
					{
						//console.log("Camino de vuelta cortado.");
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
							//console.log("Sondas conectadas y puntas entre neutros puenteados");
							tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
							conexionCorrectaParaReceptor = true;
						}
						else
						{
							//console.log("Sondas conectadas y puntas entre neutros aislados");
							tipoDeMedicion = "CONFIGURACION_mA_INTENSIDAD_mA_AC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC";
							conexionCorrectaParaReceptor = true;
						}
					}
					else
					{
						//console.log("Camino de vuelta cortado.");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = false;
					}
				}
				
				else if (conexionDeSondasAMismoPunto == true)
				{
					tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
					conexionCorrectaParaReceptor = false;
				}
			}
			else if (sondasDesconectadas == false && configuracionMedicionIntensidad10A == true && conexionDePuntasIncompleta == false)
			{
				if ((conexionEntreNeutroRegleta1YFaseRegleta1 == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta2 == true && puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true))
				{
					//console.log("Sondas conectadas y puntas entre Fase y Neutro");
					tipoDeMedicion = "CONFIGURACION_10A_INTENSIDAD_mA_AC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";

					if (puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
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
					//console.log("Puentes desconectados");
					tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

					conexionCorrectaParaReceptor = false;
				}
				
				else if (conexionEntreFaseRegleta1YFaseRegleta2 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{

						if (puenteFaseConectadoARegleta == true)
						{
							//console.log("Sondas conectadas y puntas entre fases puenteadas");
							tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

							conexionCorrectaParaReceptor = true;
						}
						else
						{
							//console.log("Sondas conectadas y puntas entre fases aisladas");
							tipoDeMedicion = "CONFIGURACION_10A_INTENSIDAD_mA_AC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC";

							conexionCorrectaParaReceptor = true;
						}
					}
					else
					{
						//console.log("Camino de vuelta cortado.");
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
							//console.log("Sondas conectadas y puntas entre neutros puenteados");
							tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

							conexionCorrectaParaReceptor == true;
						}	
						else
						{
							//console.log("Sondas conectadas y puntas entre neutros aislados");
							tipoDeMedicion = "CONFIGURACION_10A_INTENSIDAD_mA_AC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC";

							conexionCorrectaParaReceptor == true;
						}
					}
					else
					{
						//console.log("Camino de vuelta cortado.");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = false;
					}
				}
				
				else if (conexionEntreNeutroRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						//console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "CONFIGURACION_10A_INTENSIDAD_mA_AC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";

						if (puenteNeutroConectadoARegleta == true)
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
						//console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = false;
					}
				}
				
				else if (conexionEntreNeutroRegleta2YFaseRegleta1 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						//console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "CONFIGURACION_10A_INTENSIDAD_mA_AC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";

						if (puenteFaseConectadoARegleta == true)
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
						//console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";						

						conexionCorrectaParaReceptor = false;	
					}
				}
				else if (conexionDeSondasAMismoPunto == true)
				{
						//console.log("Sondas conectadas entre ellas.");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = true;
				}
			}
			else
			{//console.log("Assert linha 2752");
			}
			break;
		
		case 12:
			
			document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaVerde.png')";
			//console.log("Medimos intensidad AC en caso de uso AC");
			
			if (sondasDesconectadas == true)
			{
			
				//console.log("Sondas desconectadas");
			
				tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
			
				clearInterval(oscilacionValorMedidoVoltaje);
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
			
			else if (sondasDesconectadas == false && conexionDePuntasIncompleta == true)
			{
				//console.log("Sondas conectadas pero por lo menos una punta desconetada");
			
				tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
			
				clearInterval(oscilacionValorMedidoVoltaje);
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
			
			else if (sondasDesconectadas == false && configuracionMedicionIntensidadmA == true && conexionDePuntasIncompleta == false)
			{
				if ((conexionEntreNeutroRegleta1YFaseRegleta1 == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta2 == true && puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true))
				{
					//console.log("Sondas conectadas y puntas entre Fase y Neutro");
					tipoDeMedicion = "CONFIGURACION_mA_INTENSIDAD_mA_AC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";

					if (puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
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
					//console.log("Puentes desconectados");
					tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
					conexionCorrectaParaReceptor = false;
				}

				else if (conexionEntreFaseRegleta1YFaseRegleta2 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						if (puenteFaseConectadoARegleta == true)
						{
							//console.log("Sondas conectadas y puntas entre fases puenteadas");
							
							tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
							conexionCorrectaParaReceptor = true;
						}
						else
						{
							//console.log("Sondas conectadas y puntas entre fases aisladas");
							
							tipoDeMedicion = "CONFIGURACION_mA_INTENSIDAD_mA_AC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC";
							conexionCorrectaParaReceptor = true;
						}
					}
					else
					{
						//console.log("Conexión sin camino de vuelta");
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
							//console.log("Sondas conectadas y puntas entre neutros puenteados");
							tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
							
							conexionCorrectaParaReceptor = true;
						}
						else
						{
							//console.log("Sondas conectadas y puntas entre neutros aislados");
							tipoDeMedicion = "CONFIGURACION_mA_INTENSIDAD_mA_AC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC";
							
							conexionCorrectaParaReceptor = true;
						}
					}
					
					else
					{
						//console.log("Conexión sin camino de vuelta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
						
						conexionCorrectaParaReceptor = false;
					}
				}
		
				else if (conexionEntreNeutroRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						//console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "CONFIGURACION_mA_INTENSIDAD_mA_AC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";

						if (puenteNeutroConectadoARegleta == true)
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
						//console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = false;
					}
				}

				else if (conexionEntreNeutroRegleta2YFaseRegleta1 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						//console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "CONFIGURACION_mA_INTENSIDAD_mA_AC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";

						if (puenteFaseConectadoARegleta == true)
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
						//console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";		

						conexionCorrectaParaReceptor = false;			
					}
				}

				else if (conexionDeSondasAMismoPunto == true)
				{
					tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';

					conexionCorrectaParaReceptor = true;
				}
			}
			
			else if (sondasDesconectadas == false && configuracionMedicionIntensidad10A == true && conexionDePuntasIncompleta == false)
			{
				if ((conexionEntreNeutroRegleta1YFaseRegleta1 == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta2 == true && puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true))
				{
					//console.log("Sondas conectadas y puntas entre Fase y Neutro");
					tipoDeMedicion = "CONFIGURACION_10A_INTENSIDAD_10A_AC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";

					if (puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
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
					//console.log("Puentes desconectados");
					tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

					conexionCorrectaParaReceptor = false;
				}

				else if (conexionEntreFaseRegleta1YFaseRegleta2 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						if (puenteFaseConectadoARegleta == true)
						{
							//console.log("Sondas conectadas y puntas entre fases puenteadas");
							clearInterval(oscilacionValorMedidoIntensidadmA);
							clearInterval(oscilacionValorMedidoIntensidad10A);
							tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
							
							conexionCorrectaParaReceptor = true;
						}
						else
						{
							//console.log("Sondas conectadas y puntas entre fases aisladas");
							tipoDeMedicion = "CONFIGURACION_10A_INTENSIDAD_10A_AC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC";
							
							conexionCorrectaParaReceptor = true;
						}
					}
					else
					{
						//console.log("Conexión sin camino de vuelta");
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
							//console.log("Sondas conectadas y puntas entre neutros puenteados");
							clearInterval(oscilacionValorMedidoIntensidadmA);
							clearInterval(oscilacionValorMedidoIntensidad10A);
							
							tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
							
							conexionCorrectaParaReceptor = true;
						}
						else
						{
							//console.log("Sondas conectadas y puntas entre neutros aislados");
							tipoDeMedicion = "CONFIGURACION_10A_INTENSIDAD_10A_AC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC";
							
							conexionCorrectaParaReceptor = true;
						}
					}
					
					else
					{
						//console.log("Conexión sin camino de vuelta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
						
						conexionCorrectaParaReceptor = false;
					}
				}
				
				else if (conexionEntreNeutroRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						//console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "CONFIGURACION_10A_INTENSIDAD_10A_AC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";

						if (puenteNeutroConectadoARegleta == true) 
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
						//console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = false;
					}
				}

				else if (conexionEntreNeutroRegleta2YFaseRegleta1 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "CONFIGURACION_10A_INTENSIDAD_10A_AC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";

						if (puenteFaseConectadoARegleta == true)
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
						//console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";					

						conexionCorrectaParaReceptor = false;
					}
				}

				else if (conexionDeSondasAMismoPunto == true)
				{
						//console.log("Sondas conectadas entre ellas.");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = true;
				}
			}
			
			else
			{
			//{console.log("Assert linha 2752");
			}
			
			break;

		case 14: case 16: case 17:
			
			document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaRoja.png')";
			//console.log("Medimos intensidad DC en caso de uso AC");
			
			if (sondasDesconectadas == true)
			{
				//console.log("Sondas desconectadas");
				tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
		
				clearInterval(oscilacionValorMedidoVoltaje);
				clearInterval(oscilacionValorMedidoIntensidadmA);
				clearInterval(oscilacionValorMedidoIntensidad10A);
			}
			
			else if (sondasDesconectadas == false && conexionDePuntasIncompleta == true)
			{
				//console.log("Sondas conectadas pero por lo menos una punta desconetada");
				tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
		
				clearInterval(oscilacionValorMedidoVoltaje);
				clearInterval(oscilacionValorMedidoIntensidadmA);
				clearInterval(oscilacionValorMedidoIntensidad10A);
			}
			
			else if (sondasDesconectadas == false && configuracionMedicionIntensidadmA == true && conexionDePuntasIncompleta == false)
			{
				if ((conexionEntreNeutroRegleta1YFaseRegleta1 == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta2 == true && puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true))
				{
					//console.log("Sondas conectadas y puntas entre Fase y Neutro");
					tipoDeMedicion = "CONFIGURACION_mA_INTENSIDAD_mA_DC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC"; //-->

					if (puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
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
					//console.log("Puentes desconectados");
					tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

					conexionCorrectaParaReceptor = false;
				}

				else if (conexionEntreFaseRegleta1YFaseRegleta2 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						if (puenteFaseConectadoARegleta == true)
						{
							//console.log("Sondas conectadas y puntas entre fases puenteadas");
							
							tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
							conexionCorrectaParaReceptor = true;
						}
						else
						{
							//console.log("Sondas conectadas y puntas entre fases aisladas");
							
							tipoDeMedicion = "CONFIGURACION_mA_INTENSIDAD_mA_DC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC";
							conexionCorrectaParaReceptor = true;
						}
					}
					
					else
					{
						//console.log("Camino de vuelta cortado.");
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
							//console.log("Sondas conectadas y puntas entre neutros puenteados");
							tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
							conexionCorrectaParaReceptor = true;
						}
						else
						{
							//console.log("Sondas conectadas y puntas entre neutros aislados");
							tipoDeMedicion = "CONFIGURACION_mA_INTENSIDAD_mA_DC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC";
							conexionCorrectaParaReceptor = true;
						}
					}
					else
					{
						//console.log("Camino de vuelta cortado.");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = false;
					}
				}
				
				else if (conexionDeSondasAMismoPunto == true)
				{
					tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
					conexionCorrectaParaReceptor = false;
				}
			}
			else if (sondasDesconectadas == false && configuracionMedicionIntensidad10A == true && conexionDePuntasIncompleta == false)
			{
				if ((conexionEntreNeutroRegleta1YFaseRegleta1 == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta2 == true && puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true))
				{
					//console.log("Sondas conectadas y puntas entre Fase y Neutro");
					tipoDeMedicion = "CONFIGURACION_10A_INTENSIDAD_mA_DC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";

					if (puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
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
					//console.log("Puentes desconectados");
					tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

					conexionCorrectaParaReceptor = false;
				}
				
				else if (conexionEntreFaseRegleta1YFaseRegleta2 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{

						if (puenteFaseConectadoARegleta == true)
						{
							//console.log("Sondas conectadas y puntas entre fases puenteadas");
							tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

							conexionCorrectaParaReceptor = true;
						}
						else
						{
							//console.log("Sondas conectadas y puntas entre fases aisladas");
							tipoDeMedicion = "CONFIGURACION_10A_INTENSIDAD_mA_DC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC";

							conexionCorrectaParaReceptor = true;
						}
					}
					else
					{
						//console.log("Camino de vuelta cortado.");
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
							//console.log("Sondas conectadas y puntas entre neutros puenteados");
							tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

							conexionCorrectaParaReceptor == true;
						}	
						else
						{
							//console.log("Sondas conectadas y puntas entre neutros aislados");
							tipoDeMedicion = "CONFIGURACION_10A_INTENSIDAD_mA_DC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC";

							conexionCorrectaParaReceptor == true;
						}
					}
					else
					{
						//console.log("Camino de vuelta cortado.");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = false;
					}
				}
				
				else if (conexionEntreNeutroRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						//console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "CONFIGURACION_10A_INTENSIDAD_mA_DC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";

						if (puenteNeutroConectadoARegleta == true)
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
						//console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = false;
					}
				}
				
				else if (conexionEntreNeutroRegleta2YFaseRegleta1 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						//console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "CONFIGURACION_10A_INTENSIDAD_mA_DC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";

						if (puenteFaseConectadoARegleta == true)
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
						//console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";						

						conexionCorrectaParaReceptor = false;	
					}
				}
				else if (conexionDeSondasAMismoPunto == true)
				{
						//console.log("Sondas conectadas entre ellas.");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = true;
				}
			}

			else
			{
				//console.log("Assert linha 2752");
			}
			
			break;
		
		case 15:
			
			document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaRoja.png')";
			//console.log("Medimos intensidad DC en caso de uso AC");
			
			if (sondasDesconectadas == true)
			{
			
				//console.log("Sondas desconectadas");
			
				tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
			
				clearInterval(oscilacionValorMedidoVoltaje);
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
			
			else if (sondasDesconectadas == false && conexionDePuntasIncompleta == true)
			{
				//console.log("Sondas conectadas pero por lo menos una punta desconetada");
			
				tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
			
				clearInterval(oscilacionValorMedidoVoltaje);
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
			else if (sondasDesconectadas == false && configuracionMedicionIntensidadmA == true && conexionDePuntasIncompleta == false)
			{
				if ((conexionEntreNeutroRegleta1YFaseRegleta1 == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta2 == true && puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true))
				{
					//console.log("Sondas conectadas y puntas entre Fase y Neutro");
					tipoDeMedicion = "CONFIGURACION_mA_INTENSIDAD_mA_DC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";

					if (puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
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
					//console.log("Puentes desconectados");
					tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
					conexionCorrectaParaReceptor = false;
				}

				else if (conexionEntreFaseRegleta1YFaseRegleta2 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						if (puenteFaseConectadoARegleta == true)
						{
							//console.log("Sondas conectadas y puntas entre fases puenteadas");
							
							tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
							conexionCorrectaParaReceptor = true;
						}
						else
						{
							//console.log("Sondas conectadas y puntas entre fases aisladas");
							
							tipoDeMedicion = "CONFIGURACION_mA_INTENSIDAD_mA_DC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC";
							conexionCorrectaParaReceptor = true;
						}
					}
					else
					{
						//console.log("Conexión sin camino de vuelta");
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
							//console.log("Sondas conectadas y puntas entre neutros puenteados");
							tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
							
							conexionCorrectaParaReceptor = true;
						}
						else
						{
							//console.log("Sondas conectadas y puntas entre neutros aislados");
							tipoDeMedicion = "CONFIGURACION_mA_INTENSIDAD_mA_DC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC";
							
							conexionCorrectaParaReceptor = true;
						}
					}
					
					else
					{
						//console.log("Conexión sin camino de vuelta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
						
						conexionCorrectaParaReceptor = false;
					}
				}
		
				else if (conexionEntreNeutroRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						//console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "CONFIGURACION_mA_INTENSIDAD_mA_DC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";

						if (puenteNeutroConectadoARegleta == true)
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
						//console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = false;
					}
				}

				else if (conexionEntreNeutroRegleta2YFaseRegleta1 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						//console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "CONFIGURACION_mA_INTENSIDAD_mA_DC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";

						if (puenteFaseConectadoARegleta == true)
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
						//console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";		

						conexionCorrectaParaReceptor = false;			
					}
				}

				else if (conexionDeSondasAMismoPunto == true)
				{
					tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';

					conexionCorrectaParaReceptor = true;
				}
			}
			else if (sondasDesconectadas == false && configuracionMedicionIntensidad10A == true && conexionDePuntasIncompleta == false)
			{
				if ((conexionEntreNeutroRegleta1YFaseRegleta1 == true)
					|| (conexionEntreNeutroRegleta2YFaseRegleta2 == true && puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true))
				{
					//console.log("Sondas conectadas y puntas entre Fase y Neutro");
					tipoDeMedicion = "CONFIGURACION_10A_INTENSIDAD_10A_DC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";

					if (puenteFaseConectadoARegleta == true && puenteNeutroConectadoARegleta == true)
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
					//console.log("Puentes desconectados");
					tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

					conexionCorrectaParaReceptor = false;
				}

				else if (conexionEntreFaseRegleta1YFaseRegleta2 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						if (puenteFaseConectadoARegleta == true)
						{
							//console.log("Sondas conectadas y puntas entre fases puenteadas");
							tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
							
							conexionCorrectaParaReceptor = true;
						}
						else
						{
							//console.log("Sondas conectadas y puntas entre fases aisladas");
							tipoDeMedicion = "CONFIGURACION_10A_INTENSIDAD_10A_DC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC";
							
							conexionCorrectaParaReceptor = true;
						}
					}
					else
					{
						//console.log("Conexión sin camino de vuelta");
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
							//console.log("Sondas conectadas y puntas entre neutros puenteados");
							tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
							
							conexionCorrectaParaReceptor = true;
						}
						else
						{
							//console.log("Sondas conectadas y puntas entre neutros aislados");
							tipoDeMedicion = "CONFIGURACION_10A_INTENSIDAD_10A_DC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC";
							
							conexionCorrectaParaReceptor = true;
						}
					}
					
					else
					{
						//console.log("Conexión sin camino de vuelta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
						
						conexionCorrectaParaReceptor = false;
					}
				}
				
				else if (conexionEntreNeutroRegleta1YFaseRegleta2 == true)
				{
					if (puenteFaseConectadoARegleta == true)
					{
						//console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "CONFIGURACION_10A_INTENSIDAD_10A_DC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";

						if (puenteNeutroConectadoARegleta == true) 
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
						//console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = false;
					}
				}

				else if (conexionEntreNeutroRegleta2YFaseRegleta1 == true)
				{
					if (puenteNeutroConectadoARegleta == true)
					{
						//console.log("Sondas conectadas y puntas entre Fase y Neutro");
						tipoDeMedicion = "CONFIGURACION_10A_INTENSIDAD_10A_DC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC";

						if (puenteFaseConectadoARegleta == true)
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
						//console.log("Medición incorrecta");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";					

						conexionCorrectaParaReceptor = false;
					}
				}

				else if (conexionDeSondasAMismoPunto == true)
				{
						//console.log("Sondas conectadas entre ellas.");
						tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";

						conexionCorrectaParaReceptor = true;
				}
			}
			else
			{
				//console.log("Assert linha 2752");
			}
			
			break;

		case 18: case 19: case 20: case 21: case 22: case 23:
		
			document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaRoja.png')";

			if ((sondasDesconectadas == true)
				|| (sondasDesconectadas == false && configuracionMedicionVoltaje == true && conexionDePuntasIncompleta == true)
				|| (sondasDesconectadas == false && configuracionMedicionIntensidad10A == true && conexionDePuntasIncompleta == true))
				{
					tipoDeMedicion = 'MEDICION_FUERA_DE_ESCALA';
					
					clearInterval(oscilacionValorMedidoVoltaje);
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
					tipoDeMedicion = "MEDICION_FUERA_DE_ESCALA";
				}
			break;
	}	

}

//-----------------------------------------------------------------------------------------------------------------------
function interpretaMedicionSegunTipo()
{
	switch(tipoDeMedicion)
	{
		case "MULTIMETRO_APAGADO":

			break;

		case "MEDICION_INCORRECTA_DEVUELVE_CERO":
		
			//console.log("Topología incorrecta para medir no afectada por ruido.");
			clearInterval(oscilacionValorMedidoVoltaje);
			clearInterval(oscilacionValorMedidoIntensidadmA);
			clearInterval(oscilacionValorMedidoIntensidad10A);
			
			oscilacionValorMedidoVoltaje = undefined;
			oscilacionValorMedidoIntensidadmA = undefined;
			oscilacionValorMedidoIntensidad10A = undefined;
			
			medicion_incorrecta_devuelve_cero();
		
			break;
	
		case "MEDICION_INCORRECTA_RUIDO_BLANCO":
			
			//console.log("Topología incorrecta para medir afectada por ruido y conexión de sondas.");
			medicion_incorrecta_ruido_blanco();
			
			break;
	
		case "MEDICION_FUERA_DE_ESCALA":
			
			//console.log("Solución fuera de escala por defecto.");
			medicion_fuera_de_escala();
		
			break;

		case "CONFIGURACION_VRA_VOLTAJE_DC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC":
			
			clearInterval(variableParasetInterval);
			variableParasetInterval = undefined;
			
			configuracion_vra_voltaje_dc_puntas_entre_fase_y_neutro_ac();
			
			break;
	
		case "CONFIGURACION_VRA_VOLTAJE_DC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC":
			
			clearInterval(variableParasetInterval);
			variableParasetInterval = undefined;
			
			configuracion_vra_voltaje_dc_puntas_entre_fase_y_fase_o_neutro_y_neutro_a_traves_de_receptor_ac();
			
			break;
	
		
		case "CONFIGURACION_10A_VOLTAJE_DC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC":
		
			clearInterval(variableParasetInterval);
			variableParasetInterval = undefined;
		
			configuracion_10A_voltaje_dc_puntas_entre_fase_y_neutro_ac();
		
			break;
		
		case "CONFIGURACION_10A_VOLTAJE_DC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC":
		
			clearInterval(variableParasetInterval);
			variableParasetInterval = undefined;
		
			configuracion_10A_voltaje_dc_puntas_entre_fase_y_fase_o_neutro_y_neutro_a_traves_de_receptor_ac();
		
			break;
		
		case "CONFIGURACION_VRA_VOLTAJE_AC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC":
			
			clearInterval(variableParasetInterval);
			variableParasetInterval = undefined;
			
			configuracion_vra_voltaje_ac_puntas_entre_fase_y_neutro_ac()
			
			break;

		case "CONFIGURACION_VRA_VOLTAJE_AC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC":
			
			clearInterval(variableParasetInterval);
			variableParasetInterval = undefined;
			
			clearInterval(oscilacionValorMedidoVoltaje);
			oscilacionValorMedidoVoltaje = undefined;

			configuracion_vra_voltaje_ac_puntas_entre_fase_y_fase_o_neutro_y_neutro_a_traves_de_receptor_ac();
			
			break;

		case "CONFIGURACION_10A_VOLTAJE_AC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC":
			
			clearInterval(variableParasetInterval);
			variableParasetInterval = undefined;
			
			configuracion_10A_voltaje_ac_puntas_entre_fase_y_neutro_ac();
			
			break;
	
		case "CONFIGURACION_10A_VOLTAJE_AC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC":

			clearInterval(variableParasetInterval);
			variableParasetInterval = undefined;
		
			configuracion_10A_voltaje_ac_puntas_entre_fase_y_fase_o_neutro_y_neutro_a_traves_de_receptor_ac();
		
			break;

		case "CONFIGURACION_mA_INTENSIDAD_mA_AC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC":
		
			configuracion_mA_intensidad_mA_AC_puntas_entre_fase_y_neutro_AC();
		
			break;
		
		case "CONFIGURACION_mA_INTENSIDAD_mA_AC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC":
		
			configuracion_mA_intensidad_mA_AC_puntas_entre_fase_y_fase_o_neutro_y_neutro_a_traves_de_receptor_AC();
		
			 break;
		
		case "CONFIGURACION_10A_INTENSIDAD_mA_AC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC":
		
			configuracion_10A_intensidad_mA_AC_puntas_entre_fase_y_neutro_AC();
		
		 	break;
		
		case "CONFIGURACION_10A_INTENSIDAD_mA_AC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC":
		
			configuracion_10A_intensidad_mA_AC_puntas_entre_fase_y_neutro_AC();

			break;
		
		case "CONFIGURACION_10A_INTENSIDAD_10A_AC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC":
		
			configuracion_10A_intensidad_10A_AC_puntas_entre_fase_y_neutro_AC();

			break;

		case "CONFIGURACION_10A_INTENSIDAD_10A_AC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC":

			clearInterval(variableParasetInterval);
			variableParasetInterval = undefined;
			
			configuracion_10A_intensidad_10A_ac_puntas_entre_fase_y_fase_o_neutro_y_neutro_a_traves_de_receptor_ac();
			
			break;

		case "CONFIGURACION_mA_INTENSIDAD_mA_DC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC":
			
			configuracion_mA_intensidad_mA_DC_puntas_entre_fase_y_neutro_AC();
		
			break;

		case "CONFIGURACION_mA_INTENSIDAD_mA_DC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC":
			
			configuracion_mA_intensidad_mA_DC_puntas_entre_fase_y_fase_o_neutro_y_neutro_a_traves_de_receptor_AC();
		
			break;
		
		case "CONFIGURACION_10A_INTENSIDAD_mA_DC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC":
				
			configuracion_10A_intensidad_mA_DC_puntas_entre_fase_y_neutro_AC();

			break;
		
		case "CONFIGURACION_10A_INTENSIDAD_mA_DC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC":

			configuracion_10A_intensidad_mA_DC_PUNTAS_entre_fase_y_fase_o_neutro_y_neutro_a_traves_de_receptor_AC();

		 	break;
		
		case "CONFIGURACION_10A_INTENSIDAD_10A_DC_PUNTAS_ENTRE_FASE_Y_NEUTRO_AC":

			configuracion_10A_intensidad_10A_DC_puntas_entre_fase_y_neutro_AC();
		
			break;
		
		case "CONFIGURACION_10A_INTENSIDAD_10A_DC_PUNTAS_ENTRE_FASE_Y_FASE_O_NEUTRO_Y_NEUTRO_A_TRAVES_DE_RECEPTOR_AC":

			configuracion_10A_intensidad_10A_DC_PUNTAS_entre_fase_y_fase_o_neutro_y_neutro_a_traves_de_receptor_AC();

			break;
		
		default:

			alert("Assert linha 3144: tipoDeMedicion:" + tipoDeMedicion);

			break;
	}
}

var oscilacionValorMedidoVoltaje;
var oscilacionValorMedidoIntensidadmA;
var oscilacionValorMedidoIntensidad10A;

//---------------------------------------
function oscilaValorVoltaje(valor)
{
	valorMedido = valor + Math.random()*10 - 5;
	//console.log("Estabilización del valor medido en proceso");

	if ((valorMedido < valor + 2) && (valorMedido > valor - 2))
	{
		clearInterval(oscilacionValorMedidoVoltaje);
		//console.log("Valor de la medida estabilizado");	
	}

	analizaValorParaRepresentarEnPantalla();
}

//---------------------------------------
function oscilaValorIntensidad10A(valor)
{
	valorMedido = valor + Math.random()*0.1 - 5/100;
	//console.log("Estabilización del valor medido en proceso");

	if(receptorActivoSecador == false && receptorActivoCadena == false && receptorActivoEstufa == false)
	{
		valorMedido = 0;
	}

	if ((valorMedido < valor + .01) && (valorMedido > valor - .01))
	{
		clearInterval(oscilacionValorMedidoIntensidad10A);
		//console.log("Valor de la medida estabilizado");
	}

	analizaValorParaRepresentarEnPantalla();
}

//---------------------------------------
function oscilaValorIntensidadmA(valor)
{
	if (valor == 0 || (receptorActivoSecador == false && receptorActivoCadena == false && receptorActivoEstufa == false))
	{
		valorMedido = 0;
	}
	
	else if (valor > 0.2)
	{
		cortocircuito();
	}

	else
	{
		valorMedido = valor + Math.random()*0.0001 - 5/100000;
	}
		
	if ((valorMedido < valor + .0001) && (valorMedido > valor - .0001))
	{
		clearInterval(oscilacionValorMedidoIntensidadmA);
		//console.log("Valor de la medida estabilizado");
	}
	
	analizaValorParaRepresentarEnPantalla();
}

//-----------------------------
function cortocircuito()
{
	//console.log("configuracion_10A_voltaje_ac_puntas_entre_fase_y_neutro_ac() = CORTOCIRCUITO")
	if (configuracionMedicionIntensidad10A == true && estadoFusible10ACorrecto == true)
	{
		audioExplosionElement.play();
		estadoFusible10ACorrecto = false;
		document.getElementById('polimetro').src = './images/polimetroExplotado.png';

		alert("¡PREMIO! Te acabas de cargar el multímetro. No puedes medir la corriente de igual forma que mides la diferencia de potencial. El procedimiento que debes seguir es diferente. Lo que acabas de provocar se llama cortocircuito, y en este caso lo has hecho, incoscientemente, al colocar una punta en la fase y la otra en el neutro, habiendo configurado el múltimetro en modo amperímetro. Es como si hubieras interconectado fase y neutro directamente con un conductor de resistencia casi nula, que es como se comporta el multímetro cuando está configurado en modo amperímetro. Para poder continuar trabajando, por favor, recarga la página.")

	}
	else if (configuracionMedicionIntensidadmA == true && estadoFusiblemACorrecto == true)
	{
		audioExplosionElement.play();
		estadoFusiblemACorrecto = false;
		document.getElementById('polimetro').src = './images/polimetroFusibleFundido.png';

		if ((sondaRojaConectadaARegletaFase1	== true && sondaNegraConectadaARegletaFase2 == true)
			|| (sondaNegraConectadaARegletaFase1 == true && sondaRojaConectadaARegletaFase2 == true)
				|| (sondaRojaConectadaARegletaNeutro1	== true && sondaNegraConectadaARegletaNeutro2 == true)
					|| (sondaNegraConectadaARegletaNeutro1	== true && sondaRojaConectadaARegletaNeutro2 == true))
		{
			alert("Acabas de fundir el fusible de protección del multímetro al intentar medir una intensidad (" + (potenciaReceptor/.230).toFixed(0) + " mA) mayor a la máxima soportada en su entrada protegida (200 mA). A partir de ahora, los valores de corriente obtenidos ya no son de fiar. Para poder continuar trabajando, por favor, recarga la página.")
		}
		else
		{
			alert("Acabas de fundir el fusible de protección del multímetro al intentar medir una intensidad como si midieras una diferencia de potencial. Al colocar una punta en la fase y la otra en el neutro, y configurar el múltimetro en modo amperímetro estás provocando un cortocircuito. Es como si hubieras interconectado fase y neutro directamente con un conductor de resistencia casi nula, que es como se comporta el multímetro cuando está configurado en modo amperímetro. Para poder continuar trabajando, por favor, recarga la página.")
		}
	}
	else
	{
	}
	
	valorMedido = 0;
}

//---------------------------------------
function medicion_incorrecta_devuelve_cero()
{
	clearInterval(variableParasetInterval);
	variableParasetInterval = undefined;
	valorMedido = 0;
	analizaValorParaRepresentarEnPantalla();	
}

//-----------------------------
function medicion_incorrecta_ruido_blanco()
{
	//console.log("Al no haber conexión valida simulamos valores de ruido.");

	if (variableParasetInterval)
	{}
	else
		variableParasetInterval = setInterval(generaRuidoBlanco, 400);
}

function medicion_fuera_de_escala()
{
	representaFueraDeEscala();
}

//-----------------------------------------------------------------------------------------------------------------------
function configuracion_vra_voltaje_dc_puntas_entre_fase_y_neutro_ac()
{
	//console.log("configuracion_vra_voltaje_dc_puntas_entre_fase_y_neutro_ac()");
	valorMedido = 0;
}

//-----------------------------
function configuracion_vra_voltaje_dc_puntas_entre_fase_y_fase_o_neutro_y_neutro_a_traves_de_receptor_ac()
{
	//console.log("configuracion_vra_voltaje_dc_puntas_entre_fase_y_fase_o_neutro_y_neutro_a_traves_de_receptor_ac");
	valorMedido = 0;
}

//-----------------------------
function configuracion_10A_voltaje_dc_puntas_entre_fase_y_neutro_ac()
{
	//console.log("configuracion_10A_voltaje_dc_puntas_entre_fase_y_neutro_ac()");
	cortocircuito();
}
//-----------------------------
function configuracion_10A_voltaje_dc_puntas_entre_fase_y_fase_o_neutro_y_neutro_a_traves_de_receptor_ac()
{
	valorMedido = 0;	
}

//---------------------------------------
function configuracion_vra_voltaje_ac_puntas_entre_fase_y_neutro_ac()
{
	//console.log("configuracion_vra_voltaje_ac_puntas_entre_fase_y_neutro_ac()");

	var voltajePuntoA = 0;
	var voltajePuntoB = 230;
	var diferenciaDePotencial = voltajePuntoB - voltajePuntoA;
 	
	clearInterval(oscilacionValorMedidoVoltaje);
	oscilacionValorMedidoVoltaje = setInterval(function(){oscilaValorVoltaje(diferenciaDePotencial);}, 500);
}

//---------------------------------------
function configuracion_vra_voltaje_ac_puntas_entre_fase_y_fase_o_neutro_y_neutro_a_traves_de_receptor_ac()
{

//console.log("configuracion_vra_voltaje_ac_puntas_entre_fase_y_fase_o_neutro_y_neutro_a_traves_de_receptor_ac()");

var voltajePuntoA = 0;
var voltajePuntoB = 230;
var diferenciaDePotencial = voltajePuntoB - voltajePuntoA;
 	
	clearInterval(oscilacionValorMedidoVoltaje);

	if (receptorActivoSecador == true || receptorActivoCadena == true || receptorActivoEstufa == true)
	{
		oscilacionValorMedidoVoltaje = setInterval(function(){oscilaValorVoltaje(diferenciaDePotencial);}, 800);
 	}
 	else
 	{
 		oscilacionValorMedidoVoltaje = setInterval(function(){oscilaValorVoltaje(0);}, 800);
 	}

}

//-----------------------------
function configuracion_10A_voltaje_ac_puntas_entre_fase_y_neutro_ac()
{
	cortocircuito();
}


//-----------------------------
function configuracion_10A_voltaje_ac_puntas_entre_fase_y_fase_o_neutro_y_neutro_a_traves_de_receptor_ac()
{
	if (conexionCorrectaParaReceptor)
	{
		if (configuracionMedicionIntensidadmA)
		{
			//console.log("intensidad_dc_entre_dos_puntos_desconectados_al_mismo_potencial_ac()");
			clearInterval(oscilacionValorMedidoIntensidadmA);
	 		oscilacionValorMedidoIntensidadmA = setInterval(function(){oscilaValorIntensidadmA(potenciaReceptor/230);}, 800);
		}
		else if (configuracionMedicionIntensidad10A)
		{
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

function configuracion_mA_intensidad_mA_AC_puntas_entre_fase_y_neutro_AC()
{
	cortocircuito();
}

//----------------------------
function configuracion_mA_intensidad_mA_AC_puntas_entre_fase_y_fase_o_neutro_y_neutro_a_traves_de_receptor_AC()
{
	if (conexionCorrectaParaReceptor)
	{
		if (configuracionMedicionIntensidadmA)
		{
			//console.log("intensidad_dc_entre_dos_puntos_desconectados_al_mismo_potencial_ac()");
			clearInterval(oscilacionValorMedidoIntensidadmA);
	 		oscilacionValorMedidoIntensidadmA = setInterval(function(){oscilaValorIntensidadmA(potenciaReceptor/230);}, 800);
		}
		else if (configuracionMedicionIntensidad10A)
		{
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

//----------------------------
function configuracion_10A_intensidad_mA_AC_puntas_entre_fase_y_neutro_AC()
{
	cortocircuito();
}

//----------------------------
function configuracion_10A_intensidad_mA_AC_puntas_entre_fase_y_neutro_AC()
{
	if (conexionCorrectaParaReceptor)
	{
		if (configuracionMedicionIntensidadmA)
		{
			//console.log("intensidad_dc_entre_dos_puntos_desconectados_al_mismo_potencial_ac()");
			clearInterval(oscilacionValorMedidoIntensidadmA);
	 		oscilacionValorMedidoIntensidadmA = setInterval(function(){oscilaValorIntensidadmA(potenciaReceptor/230);}, 800);
		}
		else if (configuracionMedicionIntensidad10A)
		{
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


//----------------------------
function configuracion_10A_intensidad_10A_AC_puntas_entre_fase_y_neutro_AC()
{
	cortocircuito();
}

//-----------------------------
function configuracion_10A_intensidad_10A_ac_puntas_entre_fase_y_fase_o_neutro_y_neutro_a_traves_de_receptor_ac()
{
	if (configuracionMedicionIntensidadmA)
	{
		//console.log("intensidad_dc_entre_dos_puntos_desconectados_al_mismo_potencial_ac()");
		clearInterval(oscilacionValorMedidoIntensidadmA);
 		oscilacionValorMedidoIntensidadmA = setInterval(function(){oscilaValorIntensidadmA(potenciaReceptor/230);}, 800);
	}
	else if (configuracionMedicionIntensidad10A)
	{
		clearInterval(oscilacionValorMedidoIntensidad10A);
	 	oscilacionValorMedidoIntensidad10A = setInterval(function(){oscilaValorIntensidad10A(potenciaReceptor/230);}, 800);	
	}
}


//-----------------------------
function configuracion_mA_intensidad_mA_DC_puntas_entre_fase_y_neutro_AC()
{
	cortocircuito();
}

//-----------------------------
function configuracion_mA_intensidad_mA_DC_puntas_entre_fase_y_fase_o_neutro_y_neutro_a_traves_de_receptor_AC()
{
		valorMedido	= 0;
}

//-----------------------------
function configuracion_10A_intensidad_mA_DC_puntas_entre_fase_y_neutro_AC()
{
	cortocircuito();
}

//-----------------------------
function configuracion_10A_intensidad_mA_DC_PUNTAS_entre_fase_y_fase_o_neutro_y_neutro_a_traves_de_receptor_AC()
{
	valorMedido	= 0;
}

//-----------------------------
function configuracion_10A_intensidad_10A_DC_puntas_entre_fase_y_neutro_AC()
{
	cortocircuito();
}

//-----------------------------
function configuracion_10A_intensidad_10A_DC_PUNTAS_entre_fase_y_fase_o_neutro_y_neutro_a_traves_de_receptor_AC()
{
	valorMedido	= 0;
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