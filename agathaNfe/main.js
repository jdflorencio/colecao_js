function Valida()
{	/**
	* Validas os input e impede de receber Sql injeket
	*/
	this.email = /^\w*(\.\w*)?@\w*\.[a-z]+(\.[a-z]+)?$/;
	this.texto= /^\w*?$/;
	this.valores ;
	this.numero = /[0-9]/;
	this.telefone;
	this.celular;
	this.data;
	var inputError = "has-error has-feedback";
	var inputSuccess ="has-success has-feedback";
	var inputEmpty= "has-warning has-feedback";
	var inputName;

	this.getName = function(vName)
	{
		this.inputName = vName;		
	}
	this.result = function(valor, exp)
	{	
		
		if(exp =="texto")
		{
			exp = this.texto;
		}
		else if(exp == "email")
		{
			exp = this.email;
		}
		else if(exp == "valores")
		{
			exp = this.valores;
		}
		else if(exp == "numero")
		{
			exp = this.numero;
		}
		else if(exp == "telefone")
		{
			exp = this.telefone;
		}
		else if(exp =="celular")
		{
			exp = this.celular;
		}
		else if(exp == data)
		{
			exp = this.data;
		}
		else
		{
			alert("ops! nao tenho este modelo ainda.!");
		}

		uppercase(this.inputName);

		if(valor =="")
		{
			empty(this.inputName);
			return false;
		}
		var result = exp.test(valor);		
		if(result != false)
		{	input_aprovado(this.inputName);			
			return true;
		}
		input_reprovado(this.inputName);
		return false;
	}
	var uppercase = function(element)
	{
		element.value = element.value.toLocaleUpperCase();
	}
	var input_aprovado = function(input)
	{/*privada*/		
		var div = $(input).parents();
		$(div[0]).removeClass();
		$(div[0]).addClass('form-group '+inputSuccess);				
		return true;	
	}
	var input_reprovado = function(input)
	{
		var div = $(input).parents();
		$(div[0]).removeClass();
		$(div[0]).addClass('form-group '+inputError);	
		return true;
	}
	var empty = function(input)
	{
		var div = $(input).parents();
		$(div[0]).removeClass();
		$(div[0]).addClass('form-group '+inputEmpty);	
		return true;
	}
}
var send = function(url,serializeDados, response,dataType="json", type="POST")
	{	 
	  $.ajax({
            url: url, 
            dataType: dataType,
            type: type,
            data: serializeDados,            
            beforeSend: function()
	            {		            
		            console.log("requisitando");
	            },
            complete: function() 
	            {	            	
	            	console.log("completo");
	            },
            success: function(data, textStatus) 
	            {		           
		            response(data);		            
	            },
            error: function(xhr,er) 
	            {
	                $('#mensagem_erro').html('<p class="destaque">Error ' + xhr.status + ' - ' + xhr.statusText + '<br />Tipo de erro: ' + er +'</p>')
	            }     
        });	  
	}
function singlepage()
{ 	this.shows;
	this.length;
	this.setFrom = function(divShow)
	{
		this.shows = divShow;
		this.length = divShow.length;
	}
	/*esta classe trabalha nos processo de pagina unica*/	
	this.mostrar = function(who="#main0")
	{  //console.log(this.length);
		for(x=0; x<this.length; x++)
		{	var current = this.shows[x];
			if(this.shows[x] !=who)
			{					
				$(current).addClass("hide");										
			}
			else
			{	
				$(current).removeClass('hide');
							
			}
		}
	}
} 

function resetForm(form)
{
  $("#"+form).each(function(){
    this.reset();
  });
}