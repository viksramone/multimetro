$(function(){ 

	dragElement(document.getElementById("sondaRoja"), 0, 0, 10, 0);

	function dragElement(elmnt, x, y, tope, id) {
		
		var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
		var origenX = x;
		var origenY = y;

		if (document.getElementById(elmnt.id))
		{
	    /* if present, the header is where you move the DIV from:*/
		    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
	  	}
	  	else
	  	{
		    /* otherwise, move the DIV from anywhere inside the DIV:*/
		    elmnt.onmousedown = dragMouseDown;
	  	}
	}
 	
 	function dragMouseDown(e) {

	    e = e || window.event;
	    e.preventDefault();
	    // get the mouse cursor position at startup:
	    pos3 = e.clientX;
	    pos4 = e.clientY;
	    document.onmouseup = closeDragElement;
	    // call a function whenever the cursor moves:
	    document.onmousemove = elementDrag;
	  }
	
	
	function elementDrag(e) {
	
	    e = e || window.event;
	    e.preventDefault();
	    // calculate the new cursor position:
	    pos1 = pos3 - e.clientX;
	    pos2 = pos4 - e.clientY;
	    pos3 = e.clientX;
	    pos4 = e.clientY;
	    var yprov=elmnt.offsetTop - pos2;
	    if(tope)if(yprov<tope)yprov=tope;
	    // set the element's new position:
	    elmnt.style.top = (yprov) + "px";
	    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	    //compruebaSondas();
	    //console.log(pos3+" - "+pos4);
	    //cableBncr(elmnt.offsetLeft - pos1-800,elmnt.offsetTop - pos2-500)
	  }

	function closeDragElement() {
    /* stop moving when mouse button is released:*/
	    var xx=elmnt.style.left;
	    xx=xx.substring(0,xx.length-2);
	    var yy=elmnt.style.top;
	    yy=yy.substring(0,yy.length-2);
	    if(x|y!=0)
	    {
	    	if(id>2)
	    	{
	    		var cablex=id-2;
	    		if(cable[cablex]!=-1)canal[cable[cablex]-1]=-1;
	    		//alert("aqui yy="+yy+"xx="+xx);
	    		if(yy>425 && yy<475)
	    		{	
	    			if(xx>700 && xx<750)
	    			{
	    				if(canal[0]==-1)
	    				{
	    					xx=720;yy=445;
	    					canal[0]=cablex;	
	    					cable[cablex]=1;
	    				}
	    				else
						{
							xx=xorig;yy=yorig;
						}
	    			}
	    			else if(xx>900 && xx<950)
	    			{
	    				if(canal[1]==-1)
	    				{
	    					xx=925;yy=445;
	    					canal[1]=cablex;
	    					cable[cablex]=2;	
	    				}
	    				else
    					{
    						xx=xorig;yy=yorig;
    					}
	    			}
	    			else if(xx>1060 && xx<1100)
	    			{
	    				if(canal[2]==-1)
	    				{
	    					xx=1080;yy=445;
	    					canal[2]=cablex;
	    					cable[cablex]=3;	
	    				}
	    				else
    					{
    						xx=xorig;yy=yorig;
    					}
	    			}
	    			else
	    			{
	    				xx=x;
	    				yy=y;
	    			}
	    		}
	    		else
	    		{
	    			xx=x;
	    			yy=y;	
	    		}
	    		elmnt.style.left =xx+"px";
	    		elmnt.style.top =yy+"px";
			}
	    }
	    else
	    {
			console.log(elmnt.style.left+" , "+elmnt.style.top);	
			//compruebaSondas();
	    }
	    document.onmouseup = null;
	    document.onmousemove = null;
	}
;
});





/*********************************************************************************
	sondaNegraElement.addEventListener("mousedown", dragStart);
	conectorRojoElement.addEventListener("mousedown", dragStart);
	conectorNegroElement.addEventListener("mousedown", dragStart);
	

/*	
	sondaRojaElement.addEventListener("dragstart", e => {
		e.dataTransfer.dropEffect = "copy"
		console.log("Sonda Roja seleccionada");
	});
	sondaRojaElement.addEventListener("dragend", e => {
		console.log("Sonda Roja liberada");
	});
	sondaRojaElement.addEventListener("drag", e => {
		console.log("Sonda Roja en movimiento");
	});
	
	const sondaNegraElement = document.querySelector("#sondaNegra");
	sondaNegraElement.addEventListener("dragstart", e => {
		console.log("Sonda Negra seleccionada");
	});
	sondaNegraElement.addEventListener("dragend", e => {
		console.log("Sonda Negra liberada");
	});
	sondaNegraElement.addEventListener("drag", e => {
		console.log("Sonda Negra en movimiento");
	});
	
	const conexion10AElement = document.querySelector("#conexion10A");
	conexion10AElement.addEventListener("dragenter", e => {
		console.log("Llegando al puerto de 10A");
	});
	conexion10AElement.addEventListener("dragleave", e => {
		console.log("Saliendo del puerto de 10A");
	});
	conexion10AElement.addEventListener("dragover", e => {
		e.preventDefault();
		console.log("Merodeando por el puerto de 10A");
	});
	
	conexion10AElement.addEventListener("drop", e => {
		console.log("Liberado en el puerto de 10A");
		//conexion10AElement.appendChild(sondaRoja);
	});
	
	const conexionCOMElement = document.querySelector("#conexionCOM");
	conexionCOMElement.addEventListener("dragenter", e => {
		console.log("Llegando al puerto COM");
	});
	conexionCOMElement.addEventListener("dragleave", e => {
		console.log("Saliendo del puerto COM");
	});
	conexionCOMElement.addEventListener("Merodeando el puerto COM", e => {
		e.preventDefault();
		console.log("Liberado en el puerto COM");
	});
	
	conexionCOMElement.addEventListener("drop", e => {
		console.log("Drop");
		//conexionCOMElement.appendChild(sondaRoja);
	});

	const conexionVRAElement = document.querySelector("#conexionVRA");
	conexionVRAElement.addEventListener("dragenter", e => {
		console.log("Llegando al puerto principal");
	});
	conexionVRAElement.addEventListener("dragleave", e => {
		console.log("Saliendo del puerto principal");
	});
	conexionVRAElement.addEventListener("dragover", e => {
		e.preventDefault();
		console.log("Merodeando por el puerto principal");
	});
	
	conexionVRAElement.addEventListener("drop", e => {
		console.log("Liberado en el puerto principal");
		//conexionVRAElement.appendChild(sondaRoja);
	});
*/



<ul class="navbar">
  <li><a href="case0.html">Introducción al multímetro</a>
  <li><a href="case1.html">Caso de uso 1: Medida de diferencia de potencial en una base de enchufe</a>
  <li><a href="case2.html">Caso de uso 2: </a>
  <li><a href="case3.html">Caso de uso 3: </a>
  <li><a href="case4.html">Caso de uso 4: </a>
  <li><a href="case5.html">Caso de uso 5: </a>
  <li><a href="case6.html">Caso de uso 6: </a>		
  <li><a href="case7.html">Caso de uso 7: </a>

</ul>