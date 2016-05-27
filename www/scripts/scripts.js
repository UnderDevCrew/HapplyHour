/**
 * Created by Evergreen on 5/25/16.
 */
function createCards(response, parent, gMap, gDirection, tabs, crd)
{
  parent.innerHTML = '';
    for (var place in response.places) {

        tabs.notifyResize();

        var placeInScope                    = response.places[place];
        var paperCardElement                = document.createElement('paper-card');
        paperCardElement.innerHTML          = '';
        paperCardElement.className          = 'rate';
        paperCardElement.style.marginBottom = '12px';

        var divRateContent       = document.createElement('div');
        divRateContent.className = 'rate-content';

        var divCardContent       = document.createElement('div');
        divCardContent.className = 'card-content';

        var divRateHeader       = document.createElement('div');
        divRateHeader.className = 'rate-header';
        divRateHeader.innerHTML = placeInScope.name;

        var divRateName       = document.createElement('div');
        divRateName.className = 'rate-name';
        divRateName.innerHTML = placeInScope.shortAddress;

        divCardContent.appendChild(divRateHeader);
        divCardContent.appendChild(divRateName);

        var divCardActions       = document.createElement('div');
        divCardActions.className = 'card-actions';

        var barNote = Math.round(placeInScope.note === null ? placeInScope.note = 0 : placeInScope.note);
        var restNote = 5 - barNote;

        for (var i = 0; i < barNote; i++) {

            var paperIconButton       = document.createElement('paper-icon-button');
            paperIconButton.className = 'rate-icon yellowStar';

            paperIconButton.setAttribute('icon', 'star');
            divCardActions.appendChild(paperIconButton);
        }
        for (var i = 0; i < restNote; i++) {

            var paperIconButton       = document.createElement('paper-icon-button');
            paperIconButton.className = 'rate-icon';

            paperIconButton.setAttribute('icon', 'star');
            divCardActions.appendChild(paperIconButton);
        }

        var paperButtonReserve          = document.createElement('paper-button');
        paperButtonReserve.innerHTML    = 'GO';
        paperButtonReserve.raised       = true;
        paperButtonReserve.className    = 'cafe-reserve';
        paperButtonReserve.dataset.lat  = placeInScope.latitude;
        paperButtonReserve.dataset.long = placeInScope.longitude;
        paperButtonReserve.addEventListener('click', function () {

            var end_lat     = this.dataset.lat;
            var end_long    = this.dataset.long;
            var start       = crd.latitude + ',' + crd.longitude;
            var end         = end_lat + ',' + end_long;
            gDirection.map  = gMap.map;

            gDirection.startAddress = start;
            gDirection.endAddress   = end;

            gMap.fitToMarkers = true;
            gDirection.zoom   = 15;
            gMap.resize();

            tabs.animated = true;
            tabs.selected = 0;
            tabs.notifyResize();
        });

        divCardActions.appendChild(paperButtonReserve);
        divRateContent.appendChild(divCardContent);
        divRateContent.appendChild(divCardActions);

        var divRateImage                  = document.createElement('div');
        var img                             = 'img/BBB.jpg';
        divRateImage.className            = 'rate-image';
        divRateImage.style.background     = "url(" + img + ")";
        divRateImage.style.backgroundSize = 'cover';

        paperCardElement.appendChild(divRateContent);
        paperCardElement.appendChild(divRateImage);
        parent.appendChild(paperCardElement);

    }

}

function geolocationError(error)
{
    console.warn('ERROR(' + error.code + '): ' + error.message);

    var toast = document.getElementById('gelocationError');
    toast.open();
}

function geolocationSuccess(position)
{
    var spinner       = document.querySelector('paper-spinner');
    var gMap          = document.querySelector('google-map');
    var crd           = position.coords;
    var refreshButton = document.getElementById('refreshButton');
    var UserMarker    = document.getElementById('user_marker');
    var pages         = document.querySelector('iron-pages');
    var tabs          = document.getElementById('headerTabs');
    var finderMenu    = document.getElementById('finderMenu');
    var ajaxElement   = document.getElementById('ajax-bars');
    var gDirection    = document.querySelector('google-map-directions');

    ajaxElement.url     = "http://api.happlyhour.io/bars";

    ajaxElement.params  = {"latitude": crd.latitude, "longitude": crd.longitude};
    ajaxElement.verbose = true;

    ajaxElement.addEventListener('response', function (request) {

        var aReponseApi = request.detail.response;
        var hostElement = document.getElementById('paperCard');
        createCards(aReponseApi, hostElement, gMap, gDirection, tabs, crd);

    });

    UserMarker.latitude  = crd.latitude;
    UserMarker.longitude = crd.longitude;

    finderMenu.hidden = true;
    gMap.zoom         = 15;
    gMap.fitToMarkers = true;
    gMap.hidden       = false;
    gMap.resize();

    tabs.hidden = false;
    tabs.notifyResize();
    refreshButton.hidden = false;
    spinner.active       = false;

    var options = {
        enableHighAccuracy: true,
        maximumAge: 0
    };

    refreshButton.addEventListener('click', function () {
        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, options);
    });

    tabs.addEventListener('iron-select', function () {
        pages.selected = tabs.selected;
    });

    tabs.addEventListener('iron-select', function () {
        for (var j = 0;j < document.getElementsByClassName('yellowStar').length; j++){
            document.getElementsByClassName('yellowStar')[j].firstChild.style.fill = '#F4EC7D';
        }
    });
}
