//Отображение полного текста ошибок запросов
const IS_DEBUG = true
//При запуске через sencha watch. Все запросы будут идти через transparent proxy
const API_ROOT_DEBUG_FRONT = 'http://localhost:1841/';
// const API_ROOT_DEBUG_FRONT = 'http://172.16.204.227/';
//При отладке через django. Директория arsp3-front указана как static для django
const API_ROOT_DEBUG_BACK = 'http://localhost:8000/'


//При работе в связке с веб-сервером
//API_ROOT = '/';
if (!window.API_ROOT) {
    window.API_ROOT = API_ROOT_DEBUG_FRONT
}

// Если через django
// ... = API_ROOT_DEBUG_BACK


/**
 * Шаблон "красной точки" для обязательного поля
 */
const REQUIRED_FIELD_TPL = ['<span style="color:red;font-weight:bold" data-qtip="Required"> * </span>'];

const GRIDS_CFG = {
    PageSize: 20
};
const FORMAT_CFG = {
    READ_DATE: 'c',
    WRITE_DATE: 'd.m.Y',
    READ_DATETIME: 'c',
    WRITE_DATETIME: 'd.m.Y H:i',

    DATE_C: 'c',
    DATE: 'd.m.Y',
    DATETIME: 'd.m.Y H:i'
};

const DEFAULT_GRID_HEADER_STYLE = {
    textAlign: 'center',
    'font-size': 'smaller',
    'font-weight': 700
};

const REGIM_APP_TYPES = {
    docflow: 1,
    refwork: 2,
    dopuskwork: 3,
    admin: 4
}

const ROUTER_OBJECT_TYPES = {
    sotrudnik_by_uid: 'sotrudnik_uid',
    document_by_uid: 'document_uid',
    delo_by_uid: 'delo_uid'
}


/**
 * Выполняет переход на относительный адрес (между приложениями)
 * Если не указан relativeUrl - просто "переход" по hash  (...#sotrudnik/20dk3)
 * @param relativeUrl
 * @param routerPayload - Данные для роутера. если указано, то содержимое будет добавлено с # в начале строки
 * /DocFlow/#payload
 * @constructor
 */
const GOTO_RELATIVE_URL = function (relativeUrl, routerPayload = null, newTab = false) {
    let origin = window.location.origin;
    if (!relativeUrl && !routerPayload) {
        console.warn('Некуда переходить');
        return;
    }
    if (!relativeUrl) {
        // Если не задан относительный url - то остается как было
        relativeUrl = window.location.pathname;
    } else {
        relativeUrl = '/' + relativeUrl;
    }
    let url = `${origin}${relativeUrl}`
    if (routerPayload) {
        url = `${url}#${routerPayload}`
    }
    //console.log("GOTO", url);
    if (newTab) {
        window.open(url);
    } else {
        window.location.href = url;
    }

}

const CLEAR_URL_HASH = function () {
    window.location.hash = '';
}

//Шаблон для колонки грида со статусом для экз и прил (last_info)
const LAST_INFO_TPL =
    '<style type="text/css"> p{ font-size: smaller; color: darkblue; } </style>' +
    '<tpl if="last_info._vidacha">'
    + '<p>Выдано: {last_info._vidacha._komu_fio} ' +
    '({last_info._vidacha._kogda_datetime:date("' + FORMAT_CFG.DATETIME + '")})'
    + '</p>'
    + '</tpl>'
    + '<tpl if="last_info._spisanie">'
    + '<p>Подшит в дело: {last_info._spisanie._delo_name}(№ {last_info._spisanie._nomer_dela}) '
    + 'том № {last_info._spisanie._tom_dela}, лист(-ы): {last_info._spisanie._list_dela}</p>'
    + '</tpl>'
    + '<tpl if="last_info._otpravka">' +
    '<p>' +
    '<tpl if="last_info._otpravka._status">' +
    'Отправка: {last_info._otpravka._status}. ' +
    '</tpl>' +
    '<tpl if="last_info._otpravka._vozvrashen_list">' +
    '<tpl for="last_info._otpravka._vozvrashen_list">' +
    '<p>Возвращен: <s style="text-decoration: line-through;"> Реестр № {.}</s></p>' +
    '</tpl>' +
    '</tpl>' +
    '<tpl if="last_info._otpravka._nomer_reestr">' +
    'Реестр № {last_info._otpravka._nomer_reestr} ' +
    '</tpl>' +
    '<tpl if="last_info._otpravka._kogda_date">' +
    'от {last_info._otpravka._kogda_date:date("' + FORMAT_CFG.DATE + '")}. ' +
    '</tpl>' +
    '<tpl if="last_info._otpravka._nomer_doc">' +
    'Док-т № {last_info._otpravka._nomer_doc}. ' +
    '</tpl>' +
    '</p>' +
    '</tpl>' +
    '<tpl if="last_info._perevod_or_reg">' +
    '<p>' +
    '<tpl if="last_info._perevod_or_reg._status">' +
    'Перевод: {last_info._perevod_or_reg._status}. ' +
    '</tpl>' +
    '<tpl if="last_info._perevod_or_reg._nomer_doc">' +
    'Док-т № {last_info._perevod_or_reg._nomer_doc}. ' +
    '</tpl>' +
    '</p>' +
    '</tpl>' +
    '<tpl if="last_info._unichtozhenie">' +
    '<p style="color: red">' +
    '<tpl if="last_info._unichtozhenie._status">' +
    'Уничтожение: {last_info._unichtozhenie._status}. ' +
    '</tpl>' +
    '<tpl if="last_info._unichtozhenie._nomer_akta">' +
    'Акт № {last_info._unichtozhenie._nomer_akta} ' +
    '</tpl>' +
    '<tpl if="last_info._unichtozhenie._kogda_date">' +
    'от {last_info._unichtozhenie._kogda_date:date("' + FORMAT_CFG.DATE + '")}. ' +
    '</tpl>' +
    '</p>' +
    '</tpl>' +
    // РАЗМНОЖЕНИЕ
    '<tpl if="last_info._razmnozhenie">' +
    '<p style="color: darkmagenta">' +
    //Добавлен в наряд
    '<tpl if="last_info._razmnozhenie._new_narjad">' +
    'Добавлен в наряд на размножение №: {last_info._razmnozhenie._new_narjad}. ' +
    '</tpl>' +
    // Является копией
    '<tpl if="last_info._razmnozhenie._ekz_nomer">' +
    'Копия экз. № {last_info._razmnozhenie._ekz_nomer}. ' +
    '</tpl>' +
    // Есть копии
    '<tpl if="last_info._razmnozhenie._narjad_list">' +
    'Снята копия, наряд(-ы) № ' +
    '<tpl for="last_info._razmnozhenie._narjad_list">' +
    '{.}' +
    '</tpl>' +
    '. ' +
    '</tpl>' +
    '</p>' +
    '</tpl>'
    // Изъятие
    + '<tpl if="last_info._izyatie">'
    + '<tpl if="last_info._izyatie._status == null">'
    + '<p>В деле</p>'
    +'</tpl>'
    + '<tpl if="last_info._izyatie._status == true">'
    + '<p>Изъят: {last_info._izyatie._type_doc} №{last_info._izyatie._uch_nomer} от {last_info._izyatie._data:date("' + FORMAT_CFG.DATE + '")}</p>'
    + '</tpl>'
    + '<tpl if="last_info._izyatie._status == false">'
    + '<p>Изъят из дела: {last_info._izyatie._delo}(№ {last_info._izyatie._nomer_dela}) '
    + 'том № {last_info._izyatie._tom_dela}, лист(-ы): {last_info._izyatie._listi_dela}</p>'
    + '</tpl>'
    + '{.}' + '</tpl>';

const DOC_PRIMECHANIE_WITH_PRIL_GRID_TPL = new Ext.XTemplate(
    '<tpl>',
    '{primechanie}',
    '<tpl if="litera">',
        '<p>{[this.literList(values.litera)]}</p>',
    '</tpl>',
    '<tpl if="has_free_ekz_entry || has_free_pril_entry">',
    '<p style="font-size: smaller; color: darkgreen;"> Доступны ',
    '<tpl if="has_free_ekz_entry == true && has_free_pril_entry == true">',
    'экз. и прил.',
    '</tpl>',
    '<tpl if="has_free_ekz_entry == true && has_free_pril_entry == false">',
    'экз.',
    '</tpl>',
    '<tpl if="has_free_ekz_entry == false && has_free_pril_entry == true">',
    'прил.',
    '</tpl>',
    '</p>',
    '</tpl>',
    '<tpl if="has_free_ekz_entry == false && has_free_pril_entry == false">',
    '<p style="font-size: smaller; color: darkred;">Весь состав недоступен</p>',
    '</tpl>',
    '</tpl>',
    {
        //TODO: "Быстрый" метод для вывода информации о литере для всех документов
        literList: function (litera) {
            let liter_letters = []
            //TODO: Важно что **of** а не **in** !!!
            for (let liter_id of litera) {
                if (liter_id == 1) {
                    liter_letters.push('О');
                }
                else if(liter_id == 2){
                    liter_letters.push('М');
                }
            }
            let result = (liter_letters.length > 1 ? 'Литеры: "' : 'Литера: "')
                + liter_letters.join('", "') + '"';
            return result;
        }
    }
);