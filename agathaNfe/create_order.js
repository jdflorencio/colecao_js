var v = new Valida();
var s =new singlepage();
var windows = ["#main0", "#main1","#main2"];
s.setFrom(windows);
var tbl_produtos = '';
var pedidos_produtos = [];
var tr_position = 0;
var vltotal_subtotal;
var vltotal_total;
var total_desconto;
function formatReal( int )
{
    var tmp = int+'';
    tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
    if( tmp.length > 6 )
    {
        tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
    else if(tmp.length == 3)
    {
        tmp = "0"+tmp;
    }
    else if( tmp.length == 1)
    {
        tmp = "0,0"+tmp;
    }    
    return tmp;
}
function getMoney(str)
{   str = String(str);
    return parseInt( str.replace(/[\D]+/g,'') );
}
function formatVal()
{    
    $("#iptVLUni").priceFormat(
    {
        prefix:'',
        centsSeparator:',',
        thousandsSeparator:'.'
    });
    $("#iptSubtotal").priceFormat({
        prefix:'',
        centsSeparator:',',
        thousandsSeparator:'.'
    });  
    $("#iptDesconto").priceFormat({
        prefix:'',
        centsSeparator:',',
        thousandsSeparator:'.'
    });
    $("#iptacrescimo").priceFormat({
        prefix:'',
        centsSeparator:',',
        thousandsSeparator:'.'
    });
    $("#ipttotal").priceFormat({
        prefix:'',
        centsSeparator:',',
        thousandsSeparator:'.'
    });
}
function calctr()
{   var subtotal;
    $("#iptQtd").change(function(){
        var quantidade = getMoney($("#iptQtd").val());
        var valor_unitario = getMoney($("#iptVLUni").val());
        var subtotal = formatReal(quantidade*valor_unitario);
        $("#iptSubtotal").val(subtotal);
        $("#ipttotal").val(subtotal);
    });
    $("#iptVLUni").change(function()
    {
        var quantidade = getMoney($("#iptQtd").val());
        var valor_unitario = getMoney($("#iptVLUni").val());
        subtotal = formatReal(quantidade*valor_unitario);
        $("#iptSubtotal").val(subtotal);
        $("#ipttotal").val(subtotal);
    });
    $("#iptDesconto").change(function()
    {
        var desconto = ($("#iptDesconto").val());        
        desconto =  getMoney(desconto);
        subtotal = getMoney(subtotal);
        if(desconto > subtotal)
        {
            alert("Desconto não pode ser maior que o SUBTOTAL");
        }
        var total  = getMoney(subtotal - desconto);        
        $("#ipttotal").val(formatReal(total));
    });
    $("#iptacrescimo").change(function()
    {
        console.log('aqui');
    });
}
function current_page()
{  
   tbl_produtos = $('#tbl_produtos').DataTable(
    {
        "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-12'f>",
        "autoWidth" : false,
        "oLanguage": {
            "sSearch": 'buscar'
        },
        "order": [[ 10, "asc" ]],
        "aoColumnDefs": [    
        { "aTargets": [0], "bSearchable": false,"bSortable": true,"sWidth": "3%","sTitle":"Código","bVisible": true},    
        { "aTargets": [1], "bSearchable": false,"bSortable": false,"sWidth": "3%","sTitle":"Un","bVisible": true},
        { "aTargets": [2], "bSearchable": true,"bSortable": false,"sWidth": "25%","sTitle":"Produto","bVisible": true},     
        { "aTargets": [3], "bSearchable": false,"bSortable": true,"sWidth": "10%","sTitle":"QTD em Estoque","bVisible": true},    
        { "aTargets": [4], "bSearchable": false,"bSortable": true,"sWidth": "10%","sTitle":"Quantidade","bVisible": true}, 
        { "aTargets": [5], "bSearchable": false,"bSortable": true,"sWidth": "10%","sTitle":"Vl Unitário","bVisible": true},
        { "aTargets": [6], "bSearchable": false,"bSortable": true,"sWidth": "10%","sTitle":"SubTotal","bVisible": true},
        { "aTargets": [7], "bSearchable": false,"bSortable": true,"sWidth": "10%","sTitle":"Desconto","bVisible": true},
        { "aTargets": [8], "bSearchable": false,"bSortable": true,"sWidth": "10%","sTitle":"Acréscimo","bVisible": true},
        { "aTargets": [9], "bSearchable": false,"bSortable": true,"sWidth": "10%","sTitle":"Total","bVisible": true},
        { "aTargets": [10], "bSearchable": false,"bSortable": true,"sWidth": "1%","sTitle":"postion","bVisible": false}
        ], 
        "scrollY": '5vh', 
        "scrollCollapse": true,
        "paging": false
	});   
}
function add_newsline()
{
    var codigo = '<div class="form-group "><input type="text" id="iptcodigo" class="form-control" placeholder="" disabled></div> ';
    var unidade = '<div class="form-group "> <input type="text" id="iptunidade" class="form-control" placeholder="" disabled></div> ';
    var produto = '<div class="form-group "> <input type="text" id="iptProduto" class="form-control" placeholder=""></div> ';
    var estoque = '<div class="form-group "> <input type="text" id="ipEstoque" class="form-control" placeholder="" disabled></div> ';
    var qtd = '<div class="form-group "> <input type="text" id="iptQtd" class="form-control" placeholder=""> </div> ';
    var vlUni = '<div class="form-group "> <input type="text" id="iptVLUni" class="form-control" placeholder=""> </div> ';
    var subtotal = '<div class="form-group "> <input type="text" id="iptSubtotal" class="form-control" placeholder="" disabled></div> ';
    var desconto = '<div class="form-group "> <input type="text" id="iptDesconto" class="form-control" placeholder=""></div> ';
    var acrescimo = '<div class="form-group "> <input type="text" id="iptacrescimo" class="form-control" placeholder=""></div> ';
    var total = '<div class="form-group "> <input type="text" id="ipttotal" class="form-control" placeholder="" disabled></div> ';
    var tam = tbl_produtos.rows().count();    
    $('#tbl_produtos').DataTable().row.add([    
        codigo,
        unidade,
        produto,
        estoque,
        qtd,
        vlUni,
        subtotal,
        desconto,
        acrescimo,
        total,
        tam
        ]).draw(false);
    //formatVal();
    calctr();
}
function calcula_total()
{  
   var total = 0;
   var subtotal = 0;
   for(var x = 0; pedidos_produtos.length>x; x++ )
   {
        total =pedidos_produtos[x][9] + total;
        subtotal =pedidos_produtos[x][6] + subtotal;
   }  
   total = formatReal(total); 
   subtotal = formatReal(subtotal);
   $("#lblTotal").text(total); 
   $("#lblsubtotal").text(subtotal);
}
function remove()
{
    $('#tbl_produtos').DataTable().row.remove();
} 
$("#tbl_produtos").on("click", function()
{
	tam = $(this).DataTable().rows();
    if(tam[0].length <1)
    {
        add_newsline();
    }   
}).keydown(function(e)
    {
        if(e.which==40)
        {   
            var position = (tbl_produtos.row(tr_position).data()); 
            var iptcodigo = $("#iptcodigo").val();
            var iptunidade = $("#iptunidade").val();
            var iptProduto = $("#iptProduto").val();
            var ipEstoque = $("#ipEstoque").val();
            var iptQtd = $("#iptQtd").val();
            var iptVLUni  = getMoney($("#iptVLUni").val()); //este
            var iptSubtotal = getMoney($("#iptSubtotal").val());   //este
            var iptDesconto = getMoney($("#iptDesconto").val());//este
            var iptacrescimo  = getMoney($("#iptacrescimo").val());//este
            var ipttotal  = getMoney($("#ipttotal").val());//este
            if(iptProduto !="")
            {
                var nl = [iptcodigo, iptunidade, iptProduto, ipEstoque, iptQtd, iptVLUni, iptSubtotal, iptDesconto, iptacrescimo, ipttotal, parseInt(position[10])];
                pedidos_produtos.push(nl);
                $("#lblqtdItem").text(" "+pedidos_produtos.length);
                if(pedidos_produtos.length >2)
                {
                    var penultimo = pedidos_produtos.length -2;
                    $("#lblpenultimo").text(pedidos_produtos[penultimo][2]);
                }
                if(pedidos_produtos.length >1)
                {
                    var ultimo = pedidos_produtos.length -1;
                    $("#lblultimo").text(pedidos_produtos[ultimo][2]);
                } 
                //console.log(pedidos_produtos);
                tbl_produtos.row(parseInt(position[10])).data([iptcodigo, iptunidade, iptProduto, ipEstoque, iptQtd, formatReal(iptVLUni), formatReal(iptSubtotal), formatReal(iptDesconto), formatReal(iptacrescimo), formatReal(ipttotal), parseInt(position[10])]).draw(false);
                add_newsline();                
                tr_position +=1;
                //calcula_total();
            }
            else
            {
                alert("Está linha esta vazia!");
            }   
            calcula_total();          
        } 
    });
$("#form_cabecalho :input").change(function() 
{   v.getName(this); 
    var tipo = $(this).attr("data-id");   
    if(tipo == "radio"){ return false;} 
    var r = v.result(this.value, tipo);
    if(r == true)
    {
        $("#btn_addcliente").removeAttr('disabled');
    }
    else
    {
        $("#btn_addcliente").attr('disabled','disabled');
    }
});
//** **//
//----------------------------------------------//
// Dispara o Autocomplete a partir do segundo caracter
$("#input_cliente").autocomplete(
{       minLength: 3,  
    source: function(request, response ) 
    {       
      var teste =  $("#input_cliente").val();
      response('diego');
    },
    focus: function( event, ui ) {
        $("#input_cliente").val( ui.item.nome );
        carregarDados1();
        return false;
    },
    select: function( event, ui ) {
        $("#input_cliente").val( ui.item.nome );
        return false;
    }
}).autocomplete(this)._renderItem = function( ul, item ) 
{
  /*return $( "<li>" )
    .append( "<a ><i class='glyphicon glyphicon-user'></i><b> </b>" + item.nome + "<br><b>Razao: </b>" + item.razao)
    .appendTo( ul );*/
    return $( "<li>" )
    .append( "<a ><i class='glyphicon glyphicon-user'></i><b> </b>jOAO<br><b>Razao: </b>")
    .appendTo( ul );
};
// Função para carregar os dados da consulta nos respectivos campos
function carregarDados1()
{
    var busca = $('#input_cliente').val();
    if(busca != "" && busca.length >= 3){
        $.ajax({
            url: "",
            dataType: "json",
            data: {
                acao: 'consulta_efetivos',
                parametro: $('input_cliente').val()
            },
            success: function( data ) {
               $('#codigocliente').val(data[0]);
            }
        });
    }
}
// Função para limpar os campos caso a busca esteja vazia

/*
var availableTags = ['diego', 'elda'];
    $( "#input_cliente" ).autocomplete({
      source: availableTags
    });*/
//gravar novo pedido
$("#form_cabecalho").submit(function(e)
{
     e.preventDefault();
     var serializarDados = $('#form_cabecalho').serialize();
     var token = $("#token").val();
     $.post("pedidos/headernfe",serializarDados+"&token="+token, function(response)
     {        
        console.log(serializarDados);
       try
       {
            var obj = JSON.parse(response);
            if(obj.type == 200)
            {
                $("#token").val(obj.token);
                val();
                s.mostrar("#main1");
                $("#form_addcliente input").val("");
                alert(obj.msg);
            }
            if(obj.type == 'error')
            {
                $("#token").val(obj.token);
                console.log(obj.msg);
            }       
       }
        catch(err)
        {
            console.log("error");
            console.log(response);
        }
     });
});
current_page();
add_newsline();