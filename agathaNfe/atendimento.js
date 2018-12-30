var v = new Valida();
var s =new singlepage();
var windows = ["#main0", "#main1", "#main2"];
var abas = ["#gerais", "#estoque", "#precos", "#configFiscais","#composicao"];
s.setFrom(windows);
var varGrup; // receber os grupos
var optionUrl;
window.tbl_clientes;
function verAtendimento(cliente)
{
    var token = $("#token").val();
   $.post('clientes/consult/edit/'+cliente, {token:token}, function(response)
    {        
        /*$("#tab_opcoes li").removeClass("active");
        $("#0").addClass("active");
        controlAbas();*/
        var obj = JSON.parse(response);  
        //var radio = '';
        console.log(obj[0].tipo_pessoa, obj[0].email1);

       /*if(obj[0].tipo_pessoa =='0' || obj[0].tipo_pessoa ==0)
       {
           radio = 'pessoa_0';
           $('#' + radio).prop('checked',true);
           optionPessoa(0);
       }
       else
       {       
            radio='pessoa_1';
             $('#' + radio).prop('checked',true);
             optionPessoa(1);
       }
        $("#input_name").val(obj[0].nome);
        $("#input_apelido").val(obj[0].apelido);
        $("#input_dataNascimento").val(obj[0].dt_nascimento);
        $("#input_cpf").val(obj[0].cpf);
        $("#input_cnpj").val(obj[0].cnpj);
        $("#input_ies").val(obj[0].ies);
        $("#input_matricula").val(obj[0].matricula);
        $("#input_cell1").val(obj[0].cell1);
        $("#input_cell2").val(obj[0].cell2);
        $("#input_tel1").val(obj[0].tel1);
        $("#input_tel2").val(obj[0].tel2);
        $("#input_endereco").val(obj[0].endereco);
        $("#input_bairro").val(obj[0].bairro);
        $("#input_cidade").val(obj[0].cidade);
        $("#input_uf").val(obj[0].uf);
        $("#input_cep").val(obj[0].cep);
        $("#input_email1").val(obj[0].email1);
        $("#input_email2").val(obj[0].email2);
        $("#input_obs").val(obj[0].obs);*/
        console.log(obj[0]);
    });
   
}
function excluir(tes, outher)
{
    var  cliente = $(outher).attr('data-v');
    var token = $("#token").val();  
   $.SmartMessageBox(
   {
        title : " <b>"+cliente+"</b>",
        content : "Deseja Realmente Fechar  esse Atendimento?",
        buttons : '[Não][Sim]'
    }, function(ButtonPressed) 
    {
        if (ButtonPressed === "Não")
        {        
          console.log('não esxluir');
        }
        if (ButtonPressed === "Sim")
        {
           $.post('atendimentos/encerrar', {token:token, cliente: tes} ,function(response)
           {  
                var obj = JSON.parse(response);
                if(obj.type == 200)
                {
                    $("#token").val(obj.token);
                    val();
                    alert(obj.msg); 
                }
                if(obj.type == 'error')
                {
                    $("#token").val(obj.token);
                    alert(obj.msg);
                }  
               });           
        }        
    });
   return false;
}
function current_page()
{  
   tbl_clientes = $('#tbl_produtos').DataTable(
    {
        "dom": '<"top"f>rt<"bottom"ip><"clear">',
        "autoWidth" : false,
         "language": {
            "sSearch": '<b><span class="fa fa-search"></span>Buscar:</b> ',
            "info":           "&#32; &#32;  Exibindo de _START_ até _END_ entre um total de: _TOTAL_ cadastrados",
            "emptyTable": "Nenhuma informação foi encontrada",
             "loadingRecords": "Carregando...",
             "processing":     "Processando...",
            "paginate": 
            {
                "first":      "Primeiro",
                "last":       "Ultimo",
                "next":       "Próximo",
                "previous":   "Anterior"
            }       
        },
        "order": [[ 1, "asc" ]],
        "aoColumnDefs":[   
        { "className": "sendemail", "aTargets": [0], "bSearchable": false,"bSortable": false,"sWidth": "2%","sTitle":"","bVisible": true},    
        { "className": "ver_Infor","aTargets": [1], "bSearchable": false,"bSortable": false,"sWidth": "2%","sTitle":"","bVisible": true},
        { "aTargets": [2], "bSearchable": false,"bSortable": false,"sWidth": "2%","sTitle":"","bVisible": true}, 
        { "aTargets": [3], "bSearchable": true,"bSortable": true,"sWidth": "15%","sTitle":"idCLIENTE","bVisible": false},
        { "aTargets": [4], "bSearchable": true,"bSortable": true,"sWidth": "20%","sTitle":"CLIENTE","bVisible": true},
        //{ "aTargets": [5], "bSearchable": true,"bSortable": false,"sWidth": "5%","sTitle":"CNPJ","bVisible": false},     
        { "aTargets": [5], "bSearchable": false,"bSortable": false,"sWidth": "5%","sTitle":"TELEFONE","bVisible": true}, 
        { "aTargets": [6], "bSearchable": false,"bSortable": false,"sWidth": "5%","sTitle":"EMAIL","bVisible": false}, 
        { "aTargets": [7], "bSearchable": true,"bSortable": false,"sWidth": "10%","sTitle":"ABERTURA","bVisible": true}, 
        { "aTargets": [8], "bSearchable": false,"bSortable": false,"sWidth": "5%","sTitle":"FECHAMENTO","bVisible": false}, 
        { "aTargets": [9], "bSearchable": true,"bSortable": true,"sWidth": "10%","sTitle":"MOTIVO","bVisible": true}, 
        { "aTargets": [10], "bSearchable": true,"bSortable": true,"sWidth": "10%","sTitle":"OBSERVAÇÃO","bVisible": true},
        { "aTargets": [11], "bSearchable": true,"bSortable": true,"sWidth": "10%","sTitle":"Aberta Por","bVisible": true},
        { "aTargets": [12], "bSearchable": false,"bSortable": true,"sWidth": "1%","sTitle":"","bVisible": true}
    ],         
         scrollY:        '30vh',
        scrollCollapse: true,
        paging:         false
    });   
}
function val()
{
    $("#tbl_produtos").DataTable().clear().draw();
    var token = $("#token").val();
    $.post('atendimentos/get', {"all":"all","tipo":1,"token":token}, function(response)
    {        
        if(response.length == 0)
        {
            $("tbl_produtos").addClass('hide');
        }
        else
        {
            $("tbl_produtos").removeClass('hide');
        }
        try
        {
            response = JSON.parse(response);
            var tam = response.length;
            for(var x=0; x<tam; x++)
            {
                var ordem = x +1;
                dtInicio = response[x].dtInicio;
                dtInicio = dtInicio.replace('-','/').replace('-','/');
                console.log(dtInicio);
                var email =" <a class='btn_trEditar' id='"+response[x].idAtendimento+"' href='javascript:void(0);' ><span class='glyphicon glyphicon-envelope' ></span></a>";
                var edit = " <a class='btn_verInfor' id='"+response[x].idAtendimento+"' href='javascript:void(0);' ><span class='glyphicon glyphicon-edit' ></span></a>";
                var excluir = "<a class='btn_trExcluir' id='"+response[x].idAtendimento+"' data-v='"+response[x].nome+"' onclick='excluir(this.id, this)'><span class='glyphicon glyphicon-trash'></span></a>";           
                $('#tbl_produtos').DataTable().row.add([                
                email,
                edit,
                excluir,
                response[x].idCliente,
                response[x].nome,
                //response[x].cnpj,
                response[x].tel1,
                response[x].email,
                dtInicio,
                response[x].dtEncerramento,
                response[x].motivo,
                response[x].obs,
                response[x].quemAbriu,
                ordem
                ]).draw(false);
            }
        }
        catch(err)
        {
            console.log("error");
            console.log(response);
        }
    });    
}
current_page();
val();

//-------------- AUTO COMPLETE -------------------
// Atribui evento e função para limpeza dos campos
$('[name=input_cliente]').on('input', limpaCampos);
// Dispara o Autocomplete a partir do segundo caracter
$( "[name=input_cliente]" ).autocomplete({
    minLength: 2,
    source: function( request, response ) {
        $.ajax({
            url: "atendimentos/consult",
            type: "POST",
            dataType: "json",
            data: {
                acao: 'autocomplete',
                parametro: $('[name=input_cliente]').val()
            },
            success: function(data) 
            {
               response(data);
            }
        });
    },
    focus: function( event, ui ) {
        $("[name=input_cliente]").val( ui.item.nome );
        $("[name=input_codigocliente]").val( ui.item.id );        
        return false;
    },
    select: function( event, ui ) {
        $("[name=input_codigocliente]").val( ui.item.id );
        return false;
    }
})
.autocomplete( "instance" )._renderItem = function( ul, item ) 
{
  return $( "<li>" )
    .append( "<a><b>Nome: </b>" + item.nome + "<br><b>CNPJ: </b>" + item.cnpj)
    .appendTo( ul );
};
// Função para limpar os campos caso a busca esteja vazia
function limpaCampos(){
   var busca = $('[name=input_cliente]').val();
   if(busca == ""){
   $('#SQL_ROWID1').val('');
   }
}
$("#form_addcliente").submit(function(e)
{     e.preventDefault();
     var serializarDados = $('#form_addcliente').serialize();
     //var token = $("#token").val();     
     var token = '';   
     if($("[name=input_codigocliente]").val() ==  '')
     {
        alert('Verifique o codigo Vazio');
        return;
     }
     $.post('atendimentos/set',serializarDados+"&token="+token, function(response)
     {        
       try
       {
            var obj = JSON.parse(response);
            if(obj.type == 200)
            {
                $("#token").val(obj.token);
                val();
                //s.mostrar("#main0");
                $("#form_addcliente input").val("");
                alert(obj.msg);
                //val();
                $("#tbl_produtos").DataTable().clear().draw();
                s.mostrar("#main0");

            }
            if(obj.type == 'error')
            {
                $("#token").val(obj.token);
                alert(obj.msg);
            }       
       }
        catch(err)
        {
            console.log("error");
            console.log(response);
        }
     });
     
});
$(".atualizar").on('click', function(){
    val();
});

$(".btnNovo").on('click', function(){
    s.mostrar('#main1');
});
$("#btnCancelar_client").on("click", function(){
       
    resetForm('form_addcliente');
    s.mostrar("#main0");
});
$('#tbl_produtos tbody').on('click', 'td.ver_Infor', function()
    {
        var dados = tbl_clientes.row(this).data();
        console.log(dados[3]);
        verAtendimento(dados[3]);
        s.mostrar("#main2");
    });
$('#tbl_produtos tbody').on('click', 'td.sendemail', function()
{
    var dados = tbl_clientes.row(this).data();
    //console.log('mailto:'+dados[6]+'?subject=Fechamento%20do%20Atendimento - ['+dados[4]+']&amp;body='+dados[3]+'%20'+dados[4]+'%20'+dados[4]+'%20message%20body;');    
    window.location.href = 'mailto:'+dados[6]+'?subject=Fechamento%20do%20Atendimento - ['+dados[4]+']&amp;body='+dados[3]+'%20'+dados[4]+'%20'+dados[4]+'%20message%20body;';//"mailto:name1@rapidtables.com?cc=name2@rapidtables.com&bcc=name3@rapidtables.com&amp;subject=The%20subject%20of%20the%20email&amp;body=The%20body%20of%20the%20email";

   //window.location.href='mailto:name@mail.com?subject=The%20subject&amp;body=This%20is%20a%20message%20body';
});
//-------------- AUTO COMPLETE -------------------

/*
idAtendimento   1
idUser  1
idCliente   1570
idQuemFinalizou 0
motivo  DÚVIDAS NO SISTEMA
obs CLIENTE BURRO
dtInicio    2018-06-25 03:38:36
dtEncerramento  2018-06-25 03:38:37
encerrado   0
atendimento 0
notaAtendimento null
protocolo   null
dtAlterado  2018-06-25 03:38:53
nome    KETY MODAS & ACESSORIOS LTDA - ME
obsPadrao   ATUALIZOU VERSÃO 2011
cnpj    31.701.402/0001-47
tel1    (0xx27)3229-5654
tel2    null
cell1   null
Cell2   null
email   vi.valen@hotmail.com; anne.k@gmail.com*/