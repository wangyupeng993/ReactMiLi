class ObjectDetection {
    // 检测数据是不是除了symbol外的原始数据
    isStatic (V:any) {
        return (typeof V === 'string' || typeof V === 'number' || typeof V === 'boolean' || typeof V === 'undefined' || V === null)
    }
    // 检测数据是不是原始数据
    isPrimitive (V:any) {
        return this.isStatic(V) || typeof V === 'symbol'
    }
    // 判断数据是不是引用类型的数据 (例如： arrays, functions, objects, regexes, new Number(0),以及 new String(''))
    static isObject (V:any) {
        const type = typeof V
        return V !== null && (type === 'object' || type === 'function')
    }
    // 检查 value 是否是 类对象。 如果一个值是类对象，那么它不应该是 null，而且 typeof 后的结果是 "object"
    static isObjectLike (V:any) {
        return V !== null && typeof V === 'object'
    }
    // 获取数据类型，返回结果为 Number、String、Object、Array等
    static getRawType (V:any) {
        return Object.prototype.toString.call(V).slice(8, -1)
    }
    // 判断数据是不是Object类型的数据
    static isPlainObject (O:any) {
        return Object.prototype.toString.call(O) === '[object Object]'
    }
    // 判断数据是不是数组类型的数据
    static isArray (A:any) {
        return Object.prototype.toString.call(A) === '[object Array]'
    }
    // 判断数据是不是正则对象
    static isRegExp (V:any) {
        return Object.prototype.toString.call(V) === '[object RegExp]'
    }
    // 判断数据是不是时间对象
    static isDate (V:any) {
        return Object.prototype.toString.call(V) === '[object Date]'
    }
    // 判断是不是浏览器内置函数
    static isNative (V:any) {
        return typeof V === 'function' && /native code/.test(V.toString())
    }
    // 检查是不是函数
    static isFunction (V:any) {
        return Object.prototype.toString.call(V) === '[object Function]'
    }
    // 检查 value 是否为有效的类数组长度
    isLength (V:any) {
        return typeof V === 'number' && V > -1 && V % 1 === 0 && V <= Number.MAX_SAFE_INTEGER
    }

    // 获取url参数
    static GetUrlParam (name:string):string {
        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        const StrArr:any = window.location.search.substr(1).match(reg)||window.location.hash.substring((window.location.hash.search(/\?/)) + 1).match(reg)
        if (StrArr !== null) {
            return decodeURI(StrArr[2])
        }
        return StrArr
    }
    // 检测是否为PC端
    static isPCBroswer () {
        const Navigator = navigator.userAgent.toLowerCase()
        const isPC = Navigator.toLowerCase().match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return isPC === null
    }
    // 判断手机是否横竖屏
    static isVertical () {
        return window.orientation === 180 || window.orientation === 0
    }
    // 判断是否微信平台
    static isWeex () {
        const Navigator = navigator.userAgent.toLowerCase()
        const isweex = Navigator.match(/(MicroMessenger)/i)
        return isweex !== null
    }
    // 判断是否为整数
    static isInteger (string:any) {
        const isInteger = new RegExp('^\\+?[0-9][0-9]*$')
        return isInteger.test(string)
    }
    // 检测菲律宾手机号是否包含小数点
    static isPHPInteger (string:any) {
        const isInteger = new RegExp('^\\+?[0-9][0-9]*$')
        return isInteger.test(string)
    }
    // 检测QQ
    static isQQ (string:any) {
        const isQQ = new RegExp('^\\s*[0-9]{5,11}\\s*$')
        return isQQ.test(string)
    }
    // 检测电话号码
    static isTel (string:any) {
        const isTel = new RegExp('^0\\d{2,3}-?\\d{7,8}$')
        return isTel.test(string)
    }
    // 检测国内手机号
    static isPhone (string:any) {
        const isPhone = new RegExp('^1[3456789]\\d{9}$')
        return isPhone.test(string)
    }
    // 检测菲律宾手机号
    static isPHPMobil (string:any) {
        const isPhone = new RegExp('^0[9]\\d{9}$')
        return isPhone.test(string)
    }
    // 检测邮箱
    static isEmail (string:any) {
        const Email = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
        return Email.test(string)
    }
    // 检验密码是否数字加字母且不能有特殊字符
    static isLettersNumber (string:any) {
        const isLettersNumber = new RegExp('^[A-Za-z].*[0-9]|[0-9].*[A-Za-z]+$')
        return isLettersNumber.test(string)
    }
    static isNull (string:any) {
        const space = new RegExp('^[ ]+$')
        if (string === '') return true
        return space.test(string)
    }
}
export default ObjectDetection;
