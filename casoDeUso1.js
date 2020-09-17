//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------

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

  var selectorElement = document.getElementById('selector');  
  document.getElementById("selector").addEventListener("wheel", determinaPosicionSelector);

  var sondaRojaElement = document.getElementById('sondaRoja'), posicionXSondaRoja = 0, posicionYSondaRoja = 0;
  var sondaRojaConectadaAFASE = false, sondaRojaConectadaANEUTRO = false;
  sondaRojaElement.addEventListener("mousedown", dragStartSondaRoja);

  var sondaNegraElement = document.getElementById('sondaNegra'), posicionXSondaNegra = 0, posicionYSondaNegra = 0;
  var sondaNegraConectadaAFASE = false, sondaNegraConectadaANEUTRO = false;
  sondaNegraElement.addEventListener("mousedown", dragStartSondaNegra);

  var conectorRojoElement = document.getElementById('conectorRojo'), posicionXConectorRojo = 0, posicionYConectorRojo = 0;
  var conectorRojoConectadoA10A = false, conectorRojoConectadoAVRA = false, conectorRojoConectadoACOM = false;
  conectorRojoElement.addEventListener("mousedown", dragStartConectorRojo);

  var conectorNegroElement = document.getElementById('conectorNegro'), posicionXConectorNegro = 0, posicionYConectorNegro = 0;
  var conectorNegroConectadoA10A = false, conectorNegroConectadoAVRA = false, conectorNegroConectadoACOM = false;
  conectorNegroElement.addEventListener("mousedown", dragStartConectorNegro);

  var ultimoValorRepresentadoFueraDeEscala = false;
  var conexionCorrectaParaMedicion = false;
  var conexionCorrectaParaReceptor = true;
  var potenciaReceptor = 0;
  var VoltajeAC = 232;

  var audioExplosionElement = document.getElementById("audioExplosion");

  var sondasDesconectadas = true;
  var configuracionMedicionVoltaje = false;
  var configuracionMedicionIntensidadmA = false;
  var configuracionMedicionIntensidad10A = false;
  var configuracionMedicionContinuidad = false;
  var configuracionMedicionResistencia = false;
  
  
  var conexionDePuntasIncompleta = true;
  var conexionDeSondasAMismoPunto = false;
  
  var tipoDeMedicion;


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

  document.getElementById("selector").src = posicionSelector[indicePosicionSelector];
  console.log("posición del selector:" + indicePosicionSelector);

  if (estadoFusible10ACorrecto == true)
  {
    obtieneCaracteristicasSegunPosicionSelector();
    configuraPantallaSegunPosicionSelector();
    analizaTopologia();
    clasificaTipoDeMedicion();
    interpretaMedicionSegunTipo();
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
  document.getElementById("signo").style.fill = "#808080";
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
  console.log("Liberamos sonda roja");

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

  //clearInterval(myVar);
  if (estadoFusible10ACorrecto == true)
  {
    analizaTopologia();
    clasificaTipoDeMedicion();
    interpretaMedicionSegunTipo();
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
  console.log("Liberamos sonda negra");
  
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

  //clearInterval(myVar);
  if (estadoFusible10ACorrecto == true)
  {
    analizaTopologia();
    clasificaTipoDeMedicion();
    interpretaMedicionSegunTipo();
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
  }else
  {
    document.getElementById('conexion10A').style.fill = "transparent";
    document.getElementById('conexionCOM').style.fill = "transparent";
    document.getElementById('conexionVRA').style.fill = "transparent";  
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
    document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaRoja.png')";
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
    document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaVerde.png')";
    conectorRojoConectadoA10A = false;
    conectorRojoConectadoAVRA = true;
    conectorRojoConectadoACOM = false;
  }
  else if ((conectorRojoElement.style.left.substring(0,conectorRojoElement.style.left.length-2)) > 150
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
    document.getElementById('aspaRojaPaso3').style.backgroundImage = "url('./images/aspaRoja.png')";
    conectorRojoConectadoA10A = false;
    conectorRojoConectadoAVRA = false;
    conectorRojoConectadoACOM = true;
  }else
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
    console.log("Conector Negro conectado a puerto 10A");
    document.getElementById('aspaRojaPaso2').style.backgroundImage = "url('./images/aspaRoja.png')";
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
    console.log("Conector Negro conectado a puerto VRA");
    document.getElementById('aspaRojaPaso2').style.backgroundImage = "url('./images/aspaRoja.png')";
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
    console.log("Conector Negro conectado a puerto COM");
    document.getElementById('aspaRojaPaso2').style.backgroundImage = "url('./images/aspaVerde.png')";
    conectorNegroConectadoA10A = false;
    conectorNegroConectadoAVRA = false;
    conectorNegroConectadoACOM = true;
  }
  else
  {
    console.log("Conector negro desconectado");
    document.getElementById('aspaRojaPaso2').style.backgroundImage = "url('./images/aspaRoja.png')";
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
    //completaPantallaConValor();
    analizaValorParaRepresentarEnPantalla();
  }

  removeEventListener("mousemove", dragMoveConectorNegro);
  removeEventListener("mouseup", dragEndConectorNegro); 
}

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
function analizaTopologia()
{
  analizaConexionDeBornes();
  analizaConexionDePuntas();
}
//-----------------------------------------------------------------------------------------------------------------------
function analizaConexionDeBornes()  //Conexión de bornes (configuración del multímetro)
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
    else if ((conectorRojoConectadoA10A == true && conectorNegroConectadoAVRA)
      || (conectorNegroConectadoA10A == true && conectorRojoConectadoAVRA))
  {
    console.log("Sondas conectadas para medir voltajes DC/AC, intensidades de mA en DC/AC, continuidad y resistencia");
    sondasDesconectadas = false;
    
    configuracionMedicionVoltaje = true;
    configuracionMedicionIntensidadmA = false;
    configuracionMedicionIntensidad10A = true;
    configuracionMedicionContinuidad = false;
    configuracionMedicionResistencia = false;
  }
  else
  {
    console.log("Configuración de sondas incompleta");
    sondasDesconectadas = true;    
  }
}
//-----------------------------------------------------------------------------------------------------------------------
function analizaConexionDePuntas()
{
  console.log("Analiza la conexiones de las puntas");

  if ((sondaRojaConectadaAFASE == false && sondaNegraConectadaAFASE == false)
    || (sondaRojaConectadaANEUTRO == false && sondaNegraConectadaANEUTRO == false))
    
  {
    console.log("Hay alguna punta desconectada");
    conexionDePuntasIncompleta = true;
  }

  else if ((sondaRojaConectadaAFASE == true && sondaNegraConectadaANEUTRO == true)
      || (sondaRojaConectadaANEUTRO == true && sondaNegraConectadaAFASE == true))
  {
    console.log("Las puntas están conectadas entre Neutro y Fase.");
    
    conexionDePuntasIncompleta = false;
    conexionEntreNeutroYFase = true;
  }
  else
  {
    console.log("Conexión de puntas desconocida");
  }

}

//-----------------------------------------------------------------------------------------------------------------------
function clasificaTipoDeMedicion()
{ 
  
  if (configuracionMedicionVoltaje == true && configuracionMedicionIntensidad10A == true)
  {
    tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO'; 
  }
  else
  {

    switch (indicePosicionSelector)
    {
      case 0: tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO'; break;
        document.getElementById('aspaRojaPaso1').style.backgroundImage = "url('./images/aspaRoja.png')";  

      case 1: case 2: case 3: case 4: case 5:
        
        console.log("Medimos voltaje DC en caso de uso AC.");
        document.getElementById('aspaRojaPaso1').style.backgroundImage = "url('./images/aspaRoja.png')";

        if (sondasDesconectadas == true)
        {
          tipoDeMedicion = 'MEDICION_INCORRECTA_RUIDO_BLANCO';
          
          clearInterval(oscilacionValorMedido);
        }
        
        else if (sondasDesconectadas == false && configuracionMedicionVoltaje == true && conexionDePuntasIncompleta == true)
        {
          tipoDeMedicion = 'MEDICION_INCORRECTA_RUIDO_BLANCO';
          
          clearInterval(oscilacionValorMedido);
        }
        
        else if (sondasDesconectadas == false && configuracionMedicionIntensidad10A == true && conexionDePuntasIncompleta == true)
        {
          tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
          
          clearInterval(oscilacionValorMedido);
        }

        else if (sondasDesconectadas == false && configuracionMedicionVoltaje == true && conexionDePuntasIncompleta == false)
        {
          if (conexionEntreNeutroYFase == true)
          {
            console.log("Sondas conectadas y puntas entre Fase y Neutro");
            tipoDeMedicion = "VOLTAJE_DC_ENTRE_FASE_Y_NEUTRO_AC";
          }
          
          else if (conexionDeSondasAMismoPunto == true)
          {
              console.log("Sondas conectadas entre ellas.");
              tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
          }
        }
        
        else if (sondasDesconectadas == false && configuracionMedicionIntensidad10A == true && conexionDePuntasIncompleta == false)
        {
          if (conexionEntreNeutroYFase == true)
          {
            console.log("Sondas conectadas y puntas entre Fase y Neutro");
            tipoDeMedicion = "INTENSIDAD_AC_ENTRE_FASE_Y_NEUTRO_AC";
          }
          
          else if (conexionDeSondasAMismoPunto == true)
          {
              console.log("Sondas conectadas entre ellas.");
              tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
          }
        }
        
        else {console.log("Assert linha 2752");}
        
        break;
      
      case 6:
      
        console.log("Medimos voltaje AC en caso de uso AC");
        document.getElementById('aspaRojaPaso1').style.backgroundImage = "url('./images/aspaVerde.png')";

        if (sondasDesconectadas == true)
        {
          tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
          clearInterval(oscilacionValorMedido);
        }
        
        else if (sondasDesconectadas == false && conexionDePuntasIncompleta == true)
        {
          console.log("Sondas conectadas pero por lo menos una punta desconetada");
          tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
          clearInterval(oscilacionValorMedido);
        }
        
        else if (sondasDesconectadas == false && configuracionMedicionVoltaje == true && conexionDePuntasIncompleta == false)
        {
          if (conexionEntreNeutroYFase == true)
          {
            console.log("Sondas conectadas y puntas entre Fase y Neutro");
            tipoDeMedicion = "VOLTAJE_AC_ENTRE_FASE_Y_NEUTRO_AC";
          }
          else if (conexionDeSondasAMismoPunto == true)
          {
              console.log("Sondas conectadas entre ellas.");
              tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
          }
        }
        
        else if (sondasDesconectadas == false && configuracionMedicionIntensidad10A == true && conexionDePuntasIncompleta == false)
        {
          if (conexionEntreNeutroYFase == true)
          {
            console.log("Sondas conectadas y puntas entre Fase y Neutro");
            tipoDeMedicion = "INTENSIDAD_AC_ENTRE_FASE_Y_NEUTRO_AC";
          }
          
          else if (conexionDeSondasAMismoPunto == true)
          {
              tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
          }
        }

        else {console.log("Assert linha 2752");}
        
        break;

      case 7: case 8: case 9:
        
        console.log("Medimos voltaje AC en caso de uso AC");
        document.getElementById('aspaRojaPaso1').style.backgroundImage = "url('./images/aspaRoja.png')";

        if (sondasDesconectadas == true)
        {
          tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
          clearInterval(oscilacionValorMedido);
        }
        
        else if (sondasDesconectadas == false && conexionDePuntasIncompleta == true)
        {
          console.log("Sondas conectadas pero por lo menos una punta desconetada");
          tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
          clearInterval(oscilacionValorMedido);
        }
        
        else if (sondasDesconectadas == false && configuracionMedicionVoltaje == true && conexionDePuntasIncompleta == false)
        {
          if (conexionEntreNeutroYFase == true)
          {
            console.log("Sondas conectadas y puntas entre Fase y Neutro");
            tipoDeMedicion = "VOLTAJE_AC_ENTRE_FASE_Y_NEUTRO_AC";
          }
          else if (conexionDeSondasAMismoPunto == true)
          {
              console.log("Sondas conectadas entre ellas.");
              tipoDeMedicion = "MEDICION_INCORRECTA_DEVUELVE_CERO";
          }
        }
        
        else if (sondasDesconectadas == false && configuracionMedicionIntensidad10A == true && conexionDePuntasIncompleta == false)
        {
          if (conexionEntreNeutroYFase == true)
          {
            console.log("Sondas conectadas y puntas entre Fase y Neutro");
            tipoDeMedicion = "INTENSIDAD_AC_ENTRE_FASE_Y_NEUTRO_AC";
          }
          
          else if (conexionDeSondasAMismoPunto == true)
          {
              tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
          }
        }

        else {console.log("Assert linha 2752");}
        
        break;

      case 10:
        
        console.log("Medimos hfe");
        document.getElementById('aspaRojaPaso1').style.backgroundImage = "url('./images/aspaRoja.png')";

        break;
      
      case 11: case 13:
        
        console.log("Medimos intensidad AC en caso de uso AC");
        document.getElementById('aspaRojaPaso1').style.backgroundImage = "url('./images/aspaRoja.png')";

        if (sondasDesconectadas == true)
        {
          console.log("Sondas desconectadas");
          tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
          clearInterval(oscilacionValorMedido);
          //solucion = 'VALOR_0'
        }
        
        else if (sondasDesconectadas == false && conexionDePuntasIncompleta == true)
        {
          console.log("Sondas conectadas pero por lo menos una punta desconetada");
          tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
          clearInterval(oscilacionValorMedido);
          //solucion = 'VALOR_0'
        }
        
        else if (sondasDesconectadas == false && configuracionMedicionIntensidadmA == true && conexionDePuntasIncompleta == false)
        {
          if (conexionEntreNeutroYFase == true)
          {
            console.log("Sondas conectadas y puntas entre Fase y Neutro");
            tipoDeMedicion = "INTENSIDAD_AC_ENTRE_FASE_Y_NEUTRO_AC";
            //solucion = 'CORTOCIRCUITO'
          }
          else if (conexionDeSondasAMismoPunto == true)
          {
          tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
          }
        }
        
        else if (sondasDesconectadas == false && configuracionMedicionIntensidad10A == true && conexionDePuntasIncompleta == false)
        {
          if (conexionEntreNeutroYFase == true)
          {
            console.log("Sondas conectadas y puntas entre Fase y Neutro");
            tipoDeMedicion = "INTENSIDAD_AC_ENTRE_FASE_Y_NEUTRO_AC";
          }
          
          else if (conexionDeSondasAMismoPunto == true)
          {
            console.log("Sondas conectadas entre ellas.");
            tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
          }
        }
        
        else{console.log("Assert linha 2752");}

        break;
      
      case 12:
      
        console.log("Medimos intensidad AC en caso de uso AC");
        document.getElementById('aspaRojaPaso1').style.backgroundImage = "url('./images/aspaRoja.png')";

        if (sondasDesconectadas == true)
        {
          console.log("Sondas desconectadas");
          tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
          clearInterval(oscilacionValorMedido);
        }
        
        else if (sondasDesconectadas == false && conexionDePuntasIncompleta == true)
        {
          console.log("Sondas conectadas pero por lo menos una punta desconetada");
          tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
          clearInterval(oscilacionValorMedido);
        }
        
        else if (sondasDesconectadas == false && configuracionMedicionIntensidadmA == true && conexionDePuntasIncompleta == false)
        {
          if (conexionEntreNeutroYFase == true)
          {
            console.log("Sondas conectadas y puntas entre Fase y Neutro");
            tipoDeMedicion = "INTENSIDAD_AC_ENTRE_FASE_Y_NEUTRO_AC";
          }
          else if (conexionDeSondasAMismoPunto == true)
          {
            tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
          }
        }
        
        else if (sondasDesconectadas == false && configuracionMedicionIntensidad10A == true && conexionDePuntasIncompleta == false)
        {
          if (conexionEntreNeutroYFase == true)
          {
            console.log("Sondas conectadas y puntas entre Fase y Neutro");
            tipoDeMedicion = "INTENSIDAD_AC_ENTRE_FASE_Y_NEUTRO_AC";
          }
          else if (conexionDeSondasAMismoPunto == true)
          {
              tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
          }
        }
        
        else {console.log("Assert linha 2752");}
        
        break;

      case 14: case 16: case 17:
        
        console.log("Medimos intensidad DC en caso de uso AC");
        document.getElementById('aspaRojaPaso1').style.backgroundImage = "url('./images/aspaRoja.png')";

        if (sondasDesconectadas == true)
        {
          console.log("Sondas desconectadas");
          tipoDeMedicion = 'MEDICION_INCORRECTA';
          clearInterval(oscilacionValorMedido);
        }
        
        else if (sondasDesconectadas == false && conexionDePuntasIncompleta == true)
        {
          console.log("Sondas conectadas pero por lo menos una punta desconetada");
          tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
          clearInterval(oscilacionValorMedido);

          //solucion = 'VALOR_0'
        }
        
        else if (sondasDesconectadas == false && configuracionMedicionIntensidadmA == true && conexionDePuntasIncompleta == false)
        {
          if (conexionEntreNeutroYFase == true)
          {  
            console.log("Sondas conectadas y puntas entre Fase y Neutro");
            tipoDeMedicion = "INTENSIDAD_AC_ENTRE_FASE_Y_NEUTRO_AC";
            //solucion = 'CORTOCIRCUITO'
          }

          else if (conexionDeSondasAMismoPunto == true)
          {
            tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
          }
        }
        
        else if (sondasDesconectadas == false && configuracionMedicionIntensidad10A == true && conexionDePuntasIncompleta == false)
        {
          if (conexionEntreNeutroYFase == true)
          {
            console.log("Sondas conectadas y puntas entre Fase y Neutro");
            tipoDeMedicion = "INTENSIDAD_AC_ENTRE_FASE_Y_NEUTRO_AC";
          }
          
          else if (conexionDeSondasAMismoPunto == true)
          {
              tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
          }
        }
        
        else {console.log("Assert linha 2752");}
        
        break;
      
      case 15:

        console.log("Medimos intensidad DC en caso de uso AC");
        document.getElementById('aspaRojaPaso1').style.backgroundImage = "url('./images/aspaRoja.png')";

        if (sondasDesconectadas == true)
        {
          console.log("Sondas desconectadas");
          tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
          clearInterval(oscilacionValorMedido);
        }
        
        else if (sondasDesconectadas == false && conexionDePuntasIncompleta == true)
        {
          console.log("Sondas conectadas pero por lo menos una punta desconetada");
          tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
          clearInterval(oscilacionValorMedido);
        }
        
        else if (sondasDesconectadas == false && configuracionMedicionIntensidadmA == true && conexionDePuntasIncompleta == false)
        {
          if (conexionEntreNeutroYFase == true)
          {
            console.log("Sondas conectadas y puntas entre Fase y Neutro");
            tipoDeMedicion = "INTENSIDAD_AC_ENTRE_FASE_Y_NEUTRO_AC";
            //solucion = 'CORTOCIRCUITO'
          }
          else if (conexionDeSondasAMismoPunto == true)
          {
            tipoDeMedicion = 'MEDICION_INCORRECTA_DEVUELVE_CERO';
          }
        }
        
        else if (sondasDesconectadas == false && configuracionMedicionIntensidad10A == true && conexionDePuntasIncompleta == false)
        {
          if (conexionEntreNeutroYFase == true)
          {
            console.log("Sondas conectadas y puntas entre Fase y Neutro");
            tipoDeMedicion = "INTENSIDAD_AC_ENTRE_FASE_Y_NEUTRO_AC";
          }
          else if (conexionDeSondasAMismoPunto == true)
          {
            console.log("Sondas conectadas entre ellas.");
            tipoDeMedicion = "INTENSIDAD_AC_ENTRE_FASE_Y_NEUTRO_AC";
          }
        }
        
        else {console.log("Assert linha 2752");}
        break;

      case 18: case 19: case 20: case 21: case 22: case 23:
      
        document.getElementById('aspaRojaPaso1').style.backgroundImage = "url('./images/aspaRoja.png')";

        tipoDeMedicion = 'MEDICION_FUERA_DE_ESCALA';
            
        clearInterval(oscilacionValorMedido);

        break;
    } 
  }
  console.log(tipoDeMedicion);
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
    
    case "VOLTAJE_DC_ENTRE_FASE_Y_NEUTRO_AC":
      clearInterval(variableParasetInterval);
      variableParasetInterval = undefined;
      voltaje_dc_entre_fase_y_neutro_ac();
      break;
    
    case "VOLTAJE_AC_ENTRE_FASE_Y_NEUTRO_AC":
      clearInterval(variableParasetInterval);
      variableParasetInterval = undefined;
      voltaje_ac_entre_fase_y_neutro_ac()
      break;
    
    case "INTENSIDAD_DC_ENTRE_FASE_Y_NEUTRO_AC":
      clearInterval(variableParasetInterval);
      variableParasetInterval = undefined;
      intensidad_dc_entre_fase_y_neutro_ac();
      break;
    
    case "INTENSIDAD_AC_ENTRE_FASE_Y_NEUTRO_AC":
      clearInterval(variableParasetInterval);
      variableParasetInterval = undefined;
      intensidad_ac_entre_fase_y_neutro_ac();
      break;
  
    default: console.log("Assert linha 3144"); break;
  }
}

//-----------------------------------------------------------------------------------------------------------------------
var variableParasetInterval;
var oscilacionValorMedido;
//-----------------------------------------------------------------------------------------------------------------------
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

//-----------------------------------------------------------------------------------------------------------------------
function medicion_incorrecta_devuelve_cero()
{
  clearInterval(variableParasetInterval);
  variableParasetInterval = undefined;
  valorMedido = 0;
  analizaValorParaRepresentarEnPantalla();  
}

//-----------------------------------------------------------------------------------------------------------------------
function medicion_incorrecta_ruido_blanco()
{
  console.log("Al no haber conexión valida simulamos valores de ruido.");

  if (variableParasetInterval)
  {}
  else
    variableParasetInterval = setInterval(generaRuidoBlanco, 400);
}

//-----------------------------------------------------------------------------------------------------------------------
function medicion_fuera_de_escala()
{
  representaFueraDeEscala();
}

//-----------------------------------------------------------------------------------------------------------------------
function voltaje_dc_entre_fase_y_neutro_ac()
{
  console.log("voltaje_dc_entre_fase_y_neutro");
  valorMedido = 0;
}

//-----------------------------------------------------------------------------------------------------------------------
function voltaje_ac_entre_fase_y_neutro_ac()
{

  console.log("voltaje_ac_entre_dos_puntos_desconectados_ac()");

  var voltajePuntoA = 0;
  var voltajePuntoB = 230;
  var diferenciaDePotencial = voltajePuntoB - voltajePuntoA;
    
    clearInterval(oscilacionValorMedido);
    oscilacionValorMedido = setInterval(function(){oscilaValor(diferenciaDePotencial);}, 800);
}

//-----------------------------------------------------------------------------------------------------------------------
function intensidad_dc_entre_fase_y_neutro_ac()
{
  console.log("voltaje_dc_entre_dos_sondas_conectadas_al_mismo_punto_ac()");
  valorMedido = 0;
}

//-----------------------------------------------------------------------------------------------------------------------
function intensidad_ac_entre_fase_y_neutro_ac()
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

//-----------------------------------------------------------------------------------------------------------------------
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
