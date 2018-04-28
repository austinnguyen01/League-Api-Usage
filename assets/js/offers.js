var assetidsItems = [];
var values = 0;
var minimumItems = 1;
var maximumItems = 10
var totalInventory = 0;

//CREATE INVENTORY
var passetIds = [];
var pValues = 0;
var ptotalInventory = 0;


$(document).ready(function() {

    $('#invRefresh').click(function() {
        assetidsItems = [];
        values = 0;

        totalInventory = 0.00;

        $('#totalValue').text(parseFloat(values).toFixed(2));
        $('.itemsVar').text(assetidsItems.length);
    });

    $('#CFjoinGame').on('hidden.bs.modal', function () {
        assetidsItems = [];
        values = 0;

        totalInventory = 0.00;

        $('#totalValue').text(parseFloat(values).toFixed(2));
        $('.itemsVar').text(assetidsItems.length);
    });

    $('#CFcreate').on('hidden.bs.modal', function () {
        passetIds = [];
        pValues = 0;

        ptotalInventory = 0.00;

        $('#totalValue2').text(parseFloat(pValues).toFixed(2));
        $('.itemsVar2').text(passetIds.length);
    });

    $('#CFcreate').on('click', '#sendItemsCF', function() {
        newCoinflip(passetIds);
    });

    $('#invRefresh2').click(function() {
        passetIds = [];
        pValues = 0;

        ptotalInventory = 0.00;

        $('#totalValue2').text(parseFloat(pValues).toFixed(2));
        $('.itemsVar2').text(passetIds.length);
    });

    $('#createCF').click(function() {
        showCreateInv();
    });


    $('.container1').on('click', '.col-item', function() {
        if(!$(this).hasClass('selected'))
        {
            if(assetidsItems.length == maximumItems)
            {
                $.notify('Error: 10 items max!', 'success');
                return;
            }
            
            values += parseFloat($(this).attr('data-amount'));
            $(this).addClass('selected');

            if(values <= 0)
            {
                values = 0;
            }

            assetidsItems.push($(this).attr('data-itemid'));

            $('.itemsVar').text(assetidsItems.length);
            $('#totalValue').text(parseFloat(values).toFixed(2));

            if(values < Gapa01)
            {
                $('.offerValidator').html('<span class="label label-danger">+$' + parseFloat(Gapa01-values).toFixed(2) + '</span>');
            }
            else if(values > Gapa02)
            {
                $('.offerValidator').html('<span class="label label-danger">-$' + parseFloat(Gapa02-values).toFixed(2).replace('-', '') + '</span>');
            }
            else if(values >= Gapa01 && values <= Gapa02)
            {
                $('.offerValidator').html('<span class="label label-success">OK</span>');
            }
        }
        else
        {
            values -= parseFloat($(this).attr('data-amount'));
            $(this).removeClass('selected');

            if(values <= 0)
            {
                values = 0;
            }

            var remove = assetidsItems.indexOf($(this).attr('data-itemid'));
            if(remove != -1)
            {
                assetidsItems.splice(remove, 1);
            }

            $('.itemsVar').text(assetidsItems.length);
            $('#totalValue').text(parseFloat(values).toFixed(2));

            if(values < Gapa01)
            {
                $('.offerValidator').html('<span class="label label-danger">+$' + parseFloat(Gapa01-values).toFixed(2) + '</span>');
            }
            else if(values > Gapa02)
            {
                $('.offerValidator').html('<span class="label label-danger">-$' + parseFloat(Gapa02-values).toFixed(2).replace('-', '') + '</span>');
            }
            else if(values >= Gapa01 && values <= Gapa02)
            {
                $('.offerValidator').html('<span class="label label-success">OK</span>');
            }
        }
    });


    $('.container2').on('click', '.col-item', function() {
        if(!$(this).hasClass('selected'))
        {
            if(passetIds.length == maximumItems)
            {
                $.notify('Error: 10 items max!', 'success');
                return;
            }
            
            pValues += parseFloat($(this).attr('data-amount'));
            $(this).addClass('selected');

            if(pValues <= 0)
            {
                pValues = 0;
            }

            passetIds.push($(this).attr('data-itemid'));

            $('.itemsVar2').text(passetIds.length);
            $('#totalValue2').text(parseFloat(pValues).toFixed(2));
        }
        else
        {
            pValues -= parseFloat($(this).attr('data-amount'));
            $(this).removeClass('selected');

            if(pValues <= 0)
            {
                pValues = 0;
            }

            var remove = passetIds.indexOf($(this).attr('data-itemid'));
            if(remove != -1)
            {
                passetIds.splice(remove, 1);
            }

            $('.itemsVar2').text(passetIds.length);
            $('#totalValue2').text(parseFloat(pValues).toFixed(2));
        }
    });
});

function showCreateInv()
{
    var user_hash = getCookie('hash');
    if(SOCKET)
    {
        $('.modal-loading2').css('display', 'block');
        $('.container2').empty();
        setTimeout(function() {
            $('.modal-loading2').css('display', 'none');
            ptotalInventory = 0.00;
            SOCKET.emit('wantInv2', {
                hash: user_hash
            });
        }, 500);
    }
}


function cfJoinGame()
{
    var user_hash = getCookie('hash');
    var ids = assetidsItems.join('/');
    if(SOCKET)
    {
        SOCKET.emit('joingame', {
            assetids: ids,
            game: gameJoin,
            tradelink: tradeLink,
            hash: user_hash
        });
    }
}

function wantInventory()
{
    var hashul = getCookie('hash');
    if(SOCKET)
    {
        $('.modal-loading').css('display', 'block');
        $('.container1').empty();
        setTimeout(function() {
            $('.modal-loading').css('display', 'none');
            totalInventory = 0.00;
            SOCKET.emit('wantInv', {
                hash: hashul
            });
        }, 500);
    }
}

function newCoinflip(Items)
{
    var user_hash = getCookie('hash');
    var ids = Items.join('/');
    if(SOCKET)
    {
        SOCKET.emit('newGame', {
            assets: ids,
            hash: user_hash
        });
    }
}