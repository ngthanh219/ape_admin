import {url as baseUrl, apiUrl, onLoading, offLoading, responseNotifcation} from '../base.js';
    
const gearParams = {
    gearId: null
}

$(document).ready(function() {
    gearParams.gearId = $('#wrapper-popup').attr('data-gearid');
    
    $('.popup').addClass('show-popup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    $('#body').css('overflow', 'hidden');
    
    getGearDetail();
});

$('#hidden-popup').click(function (e) {
    e.preventDefault();
    
    $('.popup').removeClass('show-popup');
    
    setTimeout(() => {
        $('.wrapper-popup').html('');
        $('#body').css('overflow', '');
    }, 350);
})

function getGearDetail() {
    onLoading();

    $.ajax({
        url: apiUrl + 'gear-data-detail/' + gearParams.gearId,
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            if (res.success === 1) {
                var data = res.data;
                
                var power = (data['base_power'] ? data['base_power'] * 1 : 0 * 1) +
                    (data['add_power'] ? data['add_power'] * 1 : 0 * 1) + 
                    (data['gem_power'] ? data['gem_power'] * 1 : 0 * 1);
                
                var luck = (data['base_luck'] ? data['base_luck'] * 1 : 0 * 1) +
                    (data['add_luck'] ? data['add_luck'] * 1 : 0 * 1) + 
                    (data['gem_luck'] ? data['gem_luck'] * 1 : 0 * 1);
            
                var agility = (data['base_agility'] ? data['base_agility'] * 1 : 0 * 1) +
                    (data['add_agility'] ? data['add_agility'] * 1 : 0 * 1) + 
                    (data['gem_agility'] ? data['gem_agility'] * 1 : 0 * 1);
        
                var armor = (data['base_armor'] ? data['base_armor'] * 1 : 0 * 1) +
                    (data['add_armor'] ? data['add_armor'] * 1 : 0 * 1) + 
                    (data['gem_armor'] ? data['gem_armor'] * 1 : 0 * 1);

                $('.data-detail').append(`
                    <div class="popup-box-content">
                        <div class="box-information">
                            <div class="information">
                                <p>
                                    <b>ID:</b> ${data['id']}
                                </p>
                                <p>
                                    <b>Token ID:</b> ${data['token_id']}
                                </p>
                                <p>
                                    <b>Owner address:</b> ${(data['owner_address']) ? data['owner_address'] : 'No owned'}
                                </p>
                                <p>
                                    <b>User ID:</b> ${(data['user_id']) ? data['user_id'] : 'No user'}
                                </p>
                            </div>
                            <div class="image">
                                <img src="${data['image']}" alt="">
                            </div>
                        </div>
                        <div class="box-attribute">
                            <div class="child-wrap left border-right">
                                <div class="title">Status</div>
                                <p>
                                    <b>Status:</b> ${data['status']}
                                </p>
                                <p>
                                    <b>Event:</b> ${data['event']}
                                </p>
                                <p>
                                    <b>Cooldown flag:</b> ${data['cooldown_flag']}
                                </p>
                                <p>
                                    <b>Time cooldown:</b> ${(data['time_cooldown']) ? data['time_cooldown'] : 'No time'}
                                </p>
                                <p>
                                    <b>Start cooldown at:</b> ${(data['start_cooldown_at']) ? data['start_cooldown_at'] : 'No time'}
                                </p>
                                <p>
                                    <b>Favorite:</b> ${data['is_favorite']}
                                </p>
                                <p>
                                    <b>Breed:</b> ${(data['breed']) ? data['breed'] : 0}
                                </p>
                            </div>
                            <div class="child-wrap right">
                                <div class="title">Attribute</div>
                                <p>
                                    <b>Is box:</b> ${data['is_box']}
                                </p>
                                <p>
                                    <b>Rank:</b> ${(data['rank']) ? data['rank']['name'] : 0}
                                </p>
                                <p>
                                    <b>Type:</b> ${(data['type']) ? (data['type']['name']) : ''}
                                </p>
                                <p>
                                    <b>Slot:</b> ${(data['slots'] ? (data['slots'].length) : 0)}
                                </p>
                                <p>
                                    <b>Level:</b> ${data['level']}
                                </p>
                                <p>
                                    <b>Durability:</b> ${(data['durability']) ? data['durability'] : 0}
                                </p>
                                <p>
                                    <b>Point:</b> ${(data['add_point']) ? data['add_point'] : 0}
                                </p>
                                <p>
                                    <b>Power:</b> ${power}
                                </p>
                                <p>
                                    <b>Luck:</b> ${luck}
                                </p>
                                <p>
                                    <b>Agility:</b> ${agility}
                                </p>
                                <p>
                                    <b>Armor:</b> ${armor}
                                </p>
                            </div>
                        </div>
                    </div>
                `);
            } else {
                responseNotifcation(res, false);
            }

            offLoading();
        },
        error: function (XHR, status, error) {
            if (XHR.responseJSON.success == 0) {
                responseNotifcation(XHR.responseJSON, false);
            }
            
            offLoading();
        },
        complete: function (res) {
            offLoading();
        }
    });
}