let CommonUtils = {}
/**
 * Оборачивает функцию в функцию-повторялку, которая сама обернута в Promise.
 *
 * Повторяет переданную функцию столько-то раз с заданной задержкой
 * пока она не вернет true либо не будет достигнут предел повторений.
 *
 * @param maxCountBeforeFailure - сколько раз повторять функцию прежде чем reject()
 * @param repeateDelay - пауза между повторами
 * @param taskFunction - функция, возвращающая true, когда нужно вернуть resolve()
 * @returns {Ext.Promise}
 */

CommonUtils.getRepeatePromise = function (maxCountBeforeFailure, repeateDelay, taskFunction) {
    return new Ext.Promise(
        function taskRepeater(resolve, reject) {
            console.log('Promise REPEATE', maxCountBeforeFailure);
            let result = taskFunction();

            if (result) {
                console.log("Promise RESOLVE")
                resolve();
            } else {
                if (--maxCountBeforeFailure > 0) {
                    setTimeout(function () {
                        taskRepeater(resolve, reject);
                    }, repeateDelay);
                } else {
                    console.warn("Promise REJECT")
                    reject();
                }
            }

        }
    )
};