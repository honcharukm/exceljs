import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubscribers = []
        this.prepare()
        this.store = options.store
        this.subscribe = options.subscribe || []
    }
    // Настраиваем наш компонент до init
    prepare() {}
    // Возвращаем шаблон компонента
    toHTML() {
        return ''
    }
    // Инициализируем компонент
    // Добавляем DOM слушателей
    init() {
        this.initDOMListeners()
    }
    // Удаляем компонент
    // Чистим слушатели
    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
    }
    // Уведомляем слушателей про событие event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }
    // Подписиваемся на событие event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }
    $dispatch(action) {
        this.store.dispatch(action)
    }
    // Сюда приходять только изменения по тем полям,
    // на которые мы подписались
    storeChanged() {}
    isWatching(key) {
        return this.subscribe.includes(key)
    }
}