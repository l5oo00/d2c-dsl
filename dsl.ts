/**
 * 这个文件定义了一个  Node 类型，代表一个标签节点， 用来描述 UI 界面。
 *
 * Node 类型包括了一系列标签， 其中， 只有包含 children 字段的标签才可以包含子节点
 *
 * 每个标签都可以指定一系列样式，具体参考每个标签的 style 字段， style 字段里每个属性的含义和 Style 类型里的同名类型含义一致
 *
 * 每个标签都可以使用 `condition.mfor` 字段来表示循环生成多个该标签，具体用法参考下面的  Condition 类型
 */

// 展示策略
const enum Display {
    // 隐藏，不占位
    None = 'none',
    // 隐藏，占位
    Invisible = 'invisible',
    // 正常展示
    Visible = 'visible'
}

// 超出展示
const enum Overflow {
    // 自动
    Auto = 'auto',
    // 显示
    Visible = 'visible',
    // 隐藏
    Hidden = 'hidden'
}

// linear排列方向
const enum Orientation {
    // 垂直
    V = 'v',
    // 水平
    H = 'h'
}

// 布局方位(linear/frame直接子节点应用)
const enum Gravity {
    Top = 'top',
    Bottom = 'bottom',
    Left = 'left',
    Right = 'right',
    CenterV = 'center_vertical',
    CenterH = 'center_horizontal',
    Center = 'center',
    TopLeft = 'top|left',
    LeftTop = 'left|top',
    TopRight = 'top|right',
    RightTop = 'right|top',
    TopCenterH = 'top|center_horizontal',
    CenterHTop = 'center_horizontal|top',
    LeftCenterV = 'left|center_vertical',
    CenterVLeft = 'center_vertical|left',
    RightCenterV = 'right|center_vertical',
    CenterVRight = 'center_vertical|right',
    BottomLeft = 'bottom|left',
    LeftBottom = 'left|bottom',
    BottomRight = 'bottom|right',
    RightBottom = 'right|bottom',
    BottomCenterH = 'bottom|center_horizontal',
    CenterHBottom = 'center_horizontal|bottom'
}

// 主轴的方向
const enum FlexDirection {
    // 水平
    Row = 'row',
    // 垂直
    Col = 'column'
}

// 是否换行
const enum FlexWrap {
    // flex 元素 被打断到多个行中
    Wrap = 'wrap',
    // flex 的元素被摆放到到一行
    NoWrap = 'nowrap'
}

// 定义项目的放大比例(flex直接子节点应用)
const enum FlexGrow {
    // 等分剩余空间
    Yes = '1',
    // 默认为0，即如果存在剩余空间，也不放大
    No = '0'
}

// 定义了项目的缩小比例(flex直接子节点应用)
const enum FlexShrink {
    // 默认为1，即如果空间不足，该项目将缩小
    Yes = '1',
    // 如果一个项目为0，其他项目都为1，则空间不足时，前者不缩小
    No = '0'
}

// 定义了项目在主轴上的对齐方式
const enum JustifyContent {
    // 左对齐（默认值）
    FlexStart = 'flex-start',
    // 右对齐
    FlexEnd = 'flex-end',
    // 居中
    Center = 'center',
    // 两端对齐，项目之间的间隔都相等
    SpaceBetween = 'space-between',
    // 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍
    SpaceAround = 'space-around'
}

// 定义项目在交叉轴上如何对齐
const enum AlignItems {
    // 交叉轴的起点对齐
    FlexStart = 'flex-start',
    // 交叉轴的终点对齐
    FlexEnd = 'flex-end',
    // 交叉轴的中点对齐
    Center = 'center',
    // 如果项目未设置高度或设为auto，将占满整个容器的高度（默认值）
    Stretch = 'stretch'
}

// 允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性
const enum AlignSelf {
    // 继承父元素
    Auto = 'auto',
    // 交叉轴的起点对齐
    FlexStart = 'flex-start',
    // end：交叉轴的终点对齐
    FlexEnd = 'flex-end',
    // 交叉轴的中点对齐
    Center = 'center',
    // 如果项目未设置高度或设为auto，将占满整个容器的高度（默认值）
    Stretch = 'stretch'
}

// 图片填充方式
const enum ImgScaleType {
    // 不保持宽高比，拉伸填满
    FitXY = 'fitXY',
    // 保持宽高比，居中铺满，多余裁剪
    CenterCrop = 'centerCrop',
    // 保持宽高比，短边填满，剩余空白
    FitCenter = 'fitCenter'
}

// Lottie填充方式
const enum LottieResizeMode {
    // 保持宽高比，全部容纳
    Contain = 'contain'
}

// 文本粗细程度
const enum FontWeight {
    // 正常不加粗
    Normal = 'normal',
    // 500
    Mid = '500',
    // 加粗
    Bold = 'bold'
}

// 文本截断位置
const enum Ellipsis {
    // 开头
    Start = 'start',
    // 中间
    Center = 'center',
    // 结尾
    End = 'end'
}

// 文本修饰线
const enum TextDecoration {
    // 无
    None = 'none',
    // 删除线
    Through = 'line-through',
    // 下划线
    Under = 'underline'
}

// 是否循环播放
const enum LottieRepeat {
    Yse = '1',
    No = '0'
}

// 样式属性列表
interface Style {
    // 展示策略
    visibility?: Display;
    // 宽度。单位为px的数值
    width?: number;

    // 高度，单位为px的数值
    height?: number;

    // 外边距，值必须是包含四部分，依次代表上、右、下、左四个方向的间距，单位为px， 示例: margin: '10px 10px 8px 4px'
    margin?: string;

    // 内边距，值必须是包含四部分，依次代表上、右、下、左四个方向的间距，单位为px， 示例: padding: '10px 10px 8px 4px'
    padding?: string;
    // 矩形边框宽度。单位为px
    borderWidth?: number;
    // 矩形边框颜色。取值同css中border-color
    borderColor?: string;
    // 圆角边框，单位为px
    borderRadius?: string;
    // 背景颜色，仅支持 RGB 格式的颜色值， 示例: bgColor: '#fefefe'
    bgColor?: string;
    // 用于为一个元素设置一个背景图像。值为图片地址
    bgImg?: string;
    // 设置背景图片大小
    scaleType?: ImgScaleType;
    // 设置了元素溢出时所需的行为
    overflow?: Overflow;
    // 属性指定了内部元素是如何在 flex 容器中布局的，定义了主轴的方向 (正方向或反方向)，flex 容器中必须包括这个值
    flexDirection?: FlexDirection;
    // 属性指定 flex 元素单行显示还是多行显示。如果允许换行，这个属性允许你控制行的堆叠方向
    flexWrap?: FlexWrap;
    // 定义 flex 直接子元素在交叉轴上如何对齐
    alignItems?: AlignItems;
    // 定义 flex 直接子元素在主轴上的对齐方式
    justifyContent?: JustifyContent;
    // 布局方位(linear/frame直接子节点应用)
    gravity?: Gravity;
    // 类似css的z-index
    weight?: number;
    // 定义项目的放大比例(flex直接子元素应用)
    flexGrow?: FlexGrow;
    // 定义了项目的缩小比例(flex直接子元素应用)
    flexShrink?: FlexShrink;
    // 允许 flex 的直接子元素有与其他直接子元素不一样的对齐方式，可覆盖alignItems属性
    alignSelf?: AlignSelf;
    // 图片或者lottie地址
    src?: string;
    placeHolder?: string;
    loopTime?: string;
    scale?: string;
    // linear元素的排列方向
    orientation?: Orientation;
    weightSum?: string;
    gap?: string;
    showNum?: string;
    repeat?: string;
    resizeMode?: LottieResizeMode;
    // 文本字体大小k。单位为px。
    fontSize?: number;
    // 文本颜色。仅支持 RGB 格式的颜色值， 示例: color: '#fefefe'
    color?: string;
    // 文本截断位置
    ellipsis?: Ellipsis;
    // 文本粗细程度
    fontWeight?: FontWeight;
    strokeWidth?: string;
    // 文本行高。单位为px。
    lineHeight?: string;
    // 文本修饰线
    decoration?: TextDecoration;
}

/**
 * 通用样式属性，属性值类型和 Style 类型一致， 属于 Style 类型的一个子集
 */
interface GeneralStyle {
    visibility?: Display;
    width?: number;
    height?: number;
    margin?: string;
    padding?: string;
    borderWidth?: number;
    borderColor?: string;
    borderRadius?: string;
    bgColor?: string;
}

// 下面是条件类型定义

/**
 * 条件类型，仅支持 mfor 指令。
 *
 * 对于数组和对象数据， 可以使用 mfor 语法来表示循环一个列表数据， 并生成对应的节点标签， 下面是一个根据数据循环生成 span 标签的示例
 *
 * 遍历数组`{x: ['a', 'b', 'c']}`：
 * ```js
 * {
 *     type: 'span',
 *     condition: {
 *         mfor: {
 *             list: '${data.x}', // 变量 x 是个数组
 *             item: 'item', // 值就是对应单个列表项的变量名， 可以指定任意合法的变量名
 *             index: 'i' // 对应单个列表项在数组中的索引， 可以指定任意合法的变量名
 *         },
 *     },
 *     text: '${ i } - ${ item }' // 可以使用 mfor 条件里定义的变量名
 * }
 * ```
 *
 * 遍历对象`{y: {a: 1, b: 2, c: 3}}`：
 * ```js
 * {
 *     type: 'span',
 *     condition: {
 *         mfor: {
 *             list: '${data.y}', // 变量 x 是个对象
 *             item: 'val', // 值可以指定任意合法的变量名， 对应对象里单个键值对的值
 *             index: 'key' // 值可以指定任意合法的变量名， 对应对象里单个键值对的健
 *         },
 *     },
 *     text: '${ key } - ${ val }' // 可以使用 mfor 条件里定义的变量名
 * }
 * ```
 */
interface Condition {
    // 循环的列表变量，支持数组和对象
    mfor?: {
        // 要循环的列表数据， 值一般是绑定一个数组数据， 比如 list: '${data.list}'
        list: string;
        // 遍历列表项的变量名，代表该项的值
        item: string;
        // 遍历列表项的索引变量名， 代表该项的索引
        index: string;
    };
}

// 以下是所有支持的标签的具体定义， 包含了每个标签对应的 样式属性

/**
 * flex 标签支持的样式属性， flex 标签只能使用这些样式属性
 * 属性值类型和 Style 类型一致， 属于 Style 类型的一个子集
 */
interface FlexStyle extends GeneralStyle {
    flexDirection: FlexDirection;
    bgImg?: string;
    scaleType?: ImgScaleType;
    overflow?: Overflow;
    flexWrap?: FlexWrap;
    alignItems?: AlignItems;
    justifyContent?: JustifyContent;
    gravity?: Gravity;
    weight?: number;
    flexGrow?: FlexGrow;
    flexShrink?: FlexShrink;
    alignSelf?: AlignSelf;
}

// flex 标签的定义，是最常用的布局标签之一：弹性布局
interface FlexNode {
    // 标签名固定为 'flex'
    type: 'flex';
    style: FlexStyle;

    /**
     * 条件语法，仅支持 mfor 指令， 具体参考 Condition 类型
     */
    condition?: Condition;

    /**
     * 子节点，可以有多个
     */
    children: Node[];
}

/**
 * span 标签支持的样式属性， span 标签只能使用这些样式属性
 * 属性值类型和 Style 类型一致， 属于 Style 类型的一个子集
 */
interface SpanStyle {
    visibility?: Display;
    fontSize: number;
    color: string;
    ellipsis: Ellipsis;
    fontWeight: FontWeight;
    strokeWidth?: string;
    lineHeight?: string;
    decoration?: TextDecoration;
}

// span 标签的定义，是常用的内容标签之一： 纯文本标签， 用来渲染文字， 所有文字内容都只能包含在一个 span 标签里
interface SpanNode {
    // 标签名固定为 'span' , 不是 'text'
    type: 'span';
    style: SpanStyle;

    /**
     * 文本内容
     */
    text: string;

    /**
     * 条件语法，仅支持 mfor 指令， 具体参考 Condition 类型
     */
    condition?: Condition;
}

/**
 * img 标签支持的样式属性， img 标签只能使用这些样式属性
 * 属性值类型和 Style 类型一致， 属于 Style 类型的一个子集
 */
interface ImgStyle extends GeneralStyle {
    // 图片地址，一个 URL, 注意， src 属性是在标签的 style 字段下， 而不是标签的根节点里
    src: string;
    scaleType: ImgScaleType;
    placeHolder?: string;
    gravity?: Gravity;
    weight?: number;
    flexGrow?: FlexGrow;
    flexShrink?: FlexShrink;
    alignSelf?: AlignSelf;
}

// img 标签的定义，是常用的内容标签之一： 图片标签，常用来显示图片
interface ImgNode {
    // 标签名固定为 'img' , 不是 'image'
    type: 'img';
    style: ImgStyle;

    /**
     * 条件语法，仅支持 mfor 指令， 具体参考 Condition 类型
     */
    condition?: Condition;
}

/**
 * lottie 标签支持的样式属性， lottie 标签只能使用这些样式属性
 * 属性值类型和 Style 类型一致， 属于 Style 类型的一个子集
 */
interface LottieStyle extends GeneralStyle {
    // lottie 资源地址， 一个 URL， 注意， src 属性是在标签的 style 字段下， 而不是标签的根节点里
    src: string;
    scaleType: ImgScaleType;
    placeHolder?: string;
    loopTime?: string;
    scale?: string;
    repeat?: string;
    resizeMode?: LottieResizeMode;
    gravity?: Gravity;
    weight?: number;
    flexGrow?: FlexGrow;
    flexShrink?: FlexShrink;
    alignSelf?: AlignSelf;
}

// lottie 标签的定义，是内容标签之一： lottie 标签， 语法类似 img 标签，但只能用来显示 lottie 资源
interface LottieNode {
    // 标签名固定为 'lottie'
    type: 'lottie';
    style: LottieStyle;

    /**
     * 条件语法，仅支持 mfor 指令， 具体参考 Condition 类型
     */
    condition?: Condition;
}

/**
 * 以下就是标准里定义的所有标签，标签名为每个标签类型定义里的 type 字段，每个 DSL 描述都需要符合以下格式
 */
export type Node = FlexNode | SpanNode | ImgNode | LottieNode;

/*

下面是一个比较完整的示例， 包括了 mock 数据， 以及绑定了 mock 数据的 DSL 描述。

json 格式的 mock 数据如下:

```json
{
    "title": "xxx",
    "person": {
        "name": "Jack"
    },
    "x": ["a", "b"],
    "y": {
        "a": 1,
        "b": 2
    }
}
```

DSL 描述：

> 注意：为了方便描述，DSL 里省略了大部分的样式属性， 同时没有使用 JSON 格式， 而是 JS 里的对象格式

```javascript
// 需要严格符合 Node 类型
{
    type: 'flex';
    style: {
        flexDirection: 'column',
    },
    children: [
        {
            type: 'flex',
            style: {
                flexDirection: 'row',
            },
            children: [
                {
                    type: 'span',
                    text: '${ data.title }' // 使用 title 字段
                }，
                {
                    type: 'span',
                    text: '${ data.person.name }' // 使用 person.name 字段
                }
            ]
        },
        {
            type: 'flex',
            style: {
                flexDirection: 'row',
            },
            children: [
                {
                    type: 'span',
                    condition: {
                        // 使用 mfor 语法来遍历数组， 以便精简 DSL 体积
                        mfor: {
                            list: '${data.x}', // 变量 x 是个数组
                            item: 'item', // 值就是对应单个列表项的变量名， 可以指定任意合法的变量名
                            index: 'i' // 对应单个列表项在数组中的索引， 可以指定任意合法的变量名
                        },
                    },
                    text: '${ i } - ${ item }' // 可以使用 mfor 条件里定义的变量名
                }
            ]
        },
        {

            type: 'flex',
            style: {
                flexDirection: 'row',
            },
            children: [
                {
                    type: 'flex',
                    style: {
                        flexDirection: 'row',
                    },
                    condition: {
                        // 使用 mfor 语法来遍历对象， 以便精简 DSL 体积
                        mfor: {
                            list: '${data.y}', // 也支持对 对象使用 mfor 条件语法
                            item: 'val', // 值可以指定任意合法的变量名， 对应对象里单个键值对的值
                            index: 'key' // 值可以指定任意合法的变量名， 对应对象里单个键值对的健
                        },
                    },
                    children: [
                        {
                            type: 'img',
                            style: {
                                src: '${ val.imgUrl }' // 使用 for 条件里定义的变量名
                            }
                        },
                        {
                            type: 'span',
                            text: '${ key } - ${ val.text }' // 使用 for 条件里定义的变量名
                        }
                    ]
                }
            ]
        }
    ]
}
```


*/
