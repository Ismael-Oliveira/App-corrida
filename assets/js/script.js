$(function(){

    // Arrastar
    $('.drag').draggable({
        // Conecta com a função de reordenar
        connectToSortable: '.drop-container',
        cursor: "move",
        helper: 'clone'
    });

    $('.drag2').draggable({
        // Conecta com a função de reordenar
        connectToSortable: '.drop-container',
        cursor: "move"
    });

    // Soltar e reordenar
    $('.drop-container').sortable({
        placeholder: 'placeholder',
        cancel: ".ui-state-disabled",
        connectWith: ".drop-container",
        cursor: "move",
        revert: true,
        stop: function(event, ui){

            if((ui.item[0].parentNode.childElementCount > 1) && (ui.item[0].parentNode.children.length > 1)){
                $(ui.item[0].parentNode.children[1]).remove();
            }

        }

    });

    // Lixeira
    $('.lixeira').droppable({
        hoverClass: 'lixeira-ativa',
        drop: function(event, ui) {
            $(ui.draggable).remove();
        }
    });
    
    // Editar card de treino
    $('.treinoEditar').on('click', function(){
       // var nome = $(this).data('nome'); // vamos buscar o valor do atributo data-name que temos no botão que foi clicado
        var id = $(this).data('id'); // vamos buscar o valor do atributo data-id
        var texto = $(this).text();
    
        $('#editar').val(texto.trim());

        if(id == '3'){
            $('#editar').attr({maxlength: '100'});
        }else{
            $('#editar').attr({maxlength: '65'});
        }
        // chamar um scritp php passando o id  
        //  $('a.delete-yes').attr('href', 'apagar.php?id=' +id); // mudar dinamicamente o link, href do botão confirmar da modal
        $('input#cardID').val(id);//insere id no input hidden do modal
        $('#alterarTreino').modal('show'); // modal aparece
    });

    $('button.editCard').on('click', ()=>{
        var id = document.dadosForm.cardID.value;
        var treino = document.dadosForm.editar.value;
        // console.log(id);
        // alert(treino);
        var card = "#edit-"+id;
        // console.log(card);
        $(`${card}`).text(treino);
        $('#alterarTreino').modal('hide'); // fecha modal
 
    })
});

function genPDF(){

    // https://parall.ax/products/jspdf

    html2canvas(document.querySelector("#planilha"),{width: 1720}).then(function(canvas) {
        var img = canvas.toDataURL('image/png');
        var doc = new jsPDF({
            orientation: 'landscape',
            format: 'b4'
        });
        doc.addImage(img, 'JPEG', 20, 20);
        // doc.output('datauri');
        doc.save('planilha.pdf');
    });

}