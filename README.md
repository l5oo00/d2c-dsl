# D2C 平台的 DSL 标准定义

标准里本质是定义了一些标签节点， 将这些标签进行组合、嵌套即可描述任意 UI 界面。
具体标签的 DSL 描述里， 大部分属性的值都可以绑定数据， 所有标签都可以使用条件语法。

以下就是具体的类型定义：

## 标签类型

### 基础标签

所有的标签的 DSL 描述都需要符合以下 Node 类型。

```typescript
interface Node {
    /**
     * 标签名，取值唯一，不能重复
     */
    type: string;

    /**
     * 样式属性，具体参考后面的 Style 类型定义
     * 注意： 每个标签可能仅支持 Style 类型里部分特定属性， 具体参考后面每个具体标签的定义
     */
    style?: Style;

    /**
     * 其它属性，有些标签可能会有一些特定的属性，可参见具体标签的定义
     */
    props?: Record<string, any>;

    /**
     * 条件判断，目前支持 if、show、for， 具体参考后面 Condition 类型定义
     */
    condition?: Condition;

    /**
     * 子节点，可以有多个
     */
    children?: Node[];
}
```

### 容器标签

容器标签可以包含其他子节点， 比较常用， 我们专门为它定义了一个类型：

```typescript
interface ContainerNode extends Node {
    // 容器标签一定有 children 字段， 类型必须是一个数组
    children: Node[];
}
```

### 叶子标签

叶子标签不能包含其他子节点， 比较常用， 我们专门为它定义了一个类型：

```typescript
type LeafNode = Omit<Node, 'children' | 'text'>;
```

## 样式

### 支持的样式属性列表

标签支持的样式属性是有限的， 下面 `Style` 类型里的属性就是所有支持的样式属性。

> 注意： DSL 描述里的 style 字段里， 只能使用 `Style` 类型里列出来的属性

```typescript
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
    src: string;
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
    fontSize: number;
    // 文本颜色。仅支持 RGB 格式的颜色值， 示例: color: '#fefefe'
    color: string;
    // 文本截断位置
    ellipsis: Ellipsis;
    // 文本粗细程度
    fontWeight: FontWeight;
    strokeWidth?: string;
    // 文本行高。单位为px。
    lineHeight?: string;
    // 文本修饰线
    decoration?: TextDecoration;
}
```

各个属性值对应的类型如下：

### 样式属性的值类型定义

以下是上面样式属性里用到的各个值类型的定义

```typescript
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
```

### 通用样式定义

以下样式属性集合比较常用， 我们单独定义一个类型， 方便后面定义标签时复用。

```typescript
/**
 * 通用样式属性，属性值类型和 Style 类型一致， 属于 Style 类型的一个子集
 */
interface GeneralStyle {
    visibility?: Display;
    width?: string;
    height?: string;
    margin?: string;
    padding?: string;
    borderWidth?: string;
    borderColor?: string;
    borderRadius?: string;
    bgColor?: string;
}
```

## 绑定数据

DSL 里大部分字段的值，可以绑定数据里特定的字段， 格式为 '${字段名}' ， 其中字段名支持多级，数据整体本身命名固定为 `data`。

比如， `style` 下的 `color` 属性值需要绑定数据里的 `x` 字段， 则 DSL 里的对应 `color` 属性的描述为 `color: '${data.x}'`。

## 条件语法

DSL 里也可以使用条件语法，在标签节点的 `condition` 字段里声明即可， 支持 `mfor` `mif` `show` 三种语法。

```typescript
// 条件类型
interface Condition {
    // 是否渲染
    mif?: string;
    // 是否展示
    show?: string;
    // 循环渲染
    mfor?: ConditionFor;
}
```

### `mfor`

表示将一个节点循环输出，类似 vue.js 里的  `v-for` 指令，具体定义如下：

```typescript
interface ConditionFor {
    // 循环的列表变量，支持数组和对象， 值可以是数组或对象常量，也可以绑定数据
    list: string;

    item: string; // 遍历列表项的变量名，代表该项的值
    index: string; // 遍历列表项的索引变量名， 代表该项的索引
}
```

以下是使用 `mfor` 的示例：

遍历数组：

```js
{
    type: 'span',
    condition: {
        mfor: {
            list: '${data.x}', // 变量 x 是个数组
            item: 'item', // 值就是对应单个列表项的变量名， 可以指定任意合法的变量名
            index: 'i' // 对应单个列表项在数组中的索引， 可以指定任意合法的变量名
        },
    },
    text: '${ i } - ${ item }' // 可以使用 mfor 条件里定义的变量名
}
```

遍历对象：

```js
{
    type: 'span',
    condition: {
        mfor: {
            list: '${data.x}', // 变量 x 是个对象
            item: 'val', // 值可以指定任意合法的变量名， 对应对象里单个键值对的值
            index: 'key' // 值可以指定任意合法的变量名， 对应对象里单个键值对的健
        },
    },
    text: '${ key } - ${ val }' // 可以使用 mfor 条件里定义的变量名
}
```

### `mif` 和 `show`

这两个条件比较类似，一个表示是否渲染， 一个表示渲染后是否展示， 值的格式都一样，是一个表达式， 返回值会被强制转为 布尔值。

以下是几个示例：

- `mif: '${x} > 1'`
- `show: '${isShow}'`

## 标签

以下是标准里支持的所有标签：

### `flex` 标签

最常用的布局标签之一：弹性布局， 类型定义如下：

```typescript
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
    weight?: string;
    flexGrow?: FlexGrow;
    flexShrink?: FlexShrink;
    alignSelf?: AlignSelf;
}

// flex 标签的定义
interface FlexNode extends ContainerNode {
    type: 'flex';
    style: FlexStyle;
}
```

### `frameLayout` 标签

较常用的布局标签之一： 层叠布局，类似 CSS 里 `position: absolute` 的效果，只用在合适的场景里， 类型定义如下：

```typescript
/**
 * frameLayout 标签支持的样式属性， frameLayout 标签只能使用这些样式属性
 * 属性值类型和 Style 类型一致， 属于 Style 类型的一个子集
 */
interface FrameStyle extends GeneralStyle {
    bgImg?: string;
    scaleType?: ImgScaleType;
    overflow?: Overflow;
    gravity?: Gravity;
    weight?: string;
    flexGrow?: FlexGrow;
    flexShrink?: FlexShrink;
    alignSelf?: AlignSelf;
}

// frameLayout 标签的定义
interface FrameNode extends ContainerNode {
    type: 'frameLayout';
    style: FrameStyle;
}
```

### `linearLayout` 标签

常用的布局标签之一： 线性布局，类似 Android 里的 linearLayout， 类型定义如下：

```typescript
/**
 * linearLayout 标签支持的样式属性， linearLayout 标签只能使用这些样式属性
 * 属性值类型和 Style 类型一致， 属于 Style 类型的一个子集
 */
interface LinearStyle extends GeneralStyle {
    bgImg?: string;
    scaleType?: ImgScaleType;
    orientation?: Orientation;
    weightSum?: string;
    gap?: string;
    showNum?: string;
    gravity?: Gravity;
    weight?: string;
    flexGrow?: FlexGrow;
    flexShrink?: FlexShrink;
    alignSelf?: AlignSelf;
}

// linearLayout 标签的定义
interface LinearNode extends ContainerNode {
    type: 'linearLayout';
    style: LinearStyle;
}
```

### `scroll` 标签

较常用的布局标签之一： 滚动布局，内部的子元素高度或宽度超出容器尺寸后， 支持滚动，只用在合适的场景里， 类型定义如下：

```typescript
/**
 * scroll 标签支持的样式属性， scroll 标签只能使用这些样式属性
 * 属性值类型和 Style 类型一致， 属于 Style 类型的一个子集
 */
interface ScrollStyle extends GeneralStyle {
    orientation: Orientation;
    gravity?: Gravity;
    weight?: string;
    flexGrow?: FlexGrow;
    flexShrink?: FlexShrink;
    alignSelf?: AlignSelf;
}

// scroll 标签的定义
interface ScrollNode extends ContainerNode {
    type: 'scroll';
    style: ScrollStyle;
}
```

### `span` 标签

常用的内容标签之一： 纯文本标签， 用来渲染文字， 所有文字必须包含在一个 span 标签里， 类型定义如下：

```typescript
/**
 * span 标签支持的样式属性， span 标签只能使用这些样式属性
 * 属性值类型和 Style 类型一致， 属于 Style 类型的一个子集
 */
interface SpanStyle {
    visibility?: Display;
    fontSize: string;
    color: string;
    ellipsis: Ellipsis;
    fontWeight: FontWeight;
    strokeWidth?: string;
    lineHeight?: string;
    decoration?: TextDecoration;
}

// span 标签的定义
interface SpanNode extends LeafNode {
    type: 'span';
    style: SpanStyle;

    /**
     * 文本内容
     */
    text: string;
}
```

### `img` 标签

常用的内容标签之一： 图片标签，常用来显示图片， 类型定义如下：

```typescript
/**
 * img 标签支持的样式属性， img 标签只能使用这些样式属性
 * 属性值类型和 Style 类型一致， 属于 Style 类型的一个子集
 */
interface ImgStyle extends GeneralStyle {
    // 图片地址，一个 URL
    src: string;
    scaleType: ImgScaleType;
    placeHolder?: string;
    gravity?: Gravity;
    weight?: string;
    flexGrow?: FlexGrow;
    flexShrink?: FlexShrink;
    alignSelf?: AlignSelf;
}

// img 标签的定义
interface ImgNode extends LeafNode {
    type: 'img';
    style: ImgStyle;
}
```

### `lottie` 标签

内容标签之一： lottie 标签， 语法类似 img 标签，但只能用来显示 lottie 资源， 类型定义如下：

```typescript
/**
 * lottie 标签支持的样式属性， lottie 标签只能使用这些样式属性
 * 属性值类型和 Style 类型一致， 属于 Style 类型的一个子集
 */
interface LottieStyle extends GeneralStyle {
    // lottie 资源地址， 一个 URL
    src: string;
    scaleType: ImgScaleType;
    placeHolder?: string;
    loopTime?: string;
    scale?: string;
    repeat?: string;
    resizeMode?: LottieResizeMode;
    gravity?: Gravity;
    weight?: string;
    flexGrow?: FlexGrow;
    flexShrink?: FlexShrink;
    alignSelf?: AlignSelf;
}

// lottie 标签的定义
interface LottieNode extends Node {
    type: 'lottie';
    style: LottieStyle;
}
```


## 最后

一个合法的 DSL 描述必须符合以下类型：

```typescript
type DSL = FlexNode | FrameNode | LinearNode | ScrollNode | SpanNode | ImgNode;
```

即：

- 只能使用定义的这些标签，即 type 字段的值绝对不能出现其他未定义的标签名
- 各个标签下只能使用定义里对应的样式属性， 即 style 字段下绝对不能出现该标签定义里未出现的属性名

以下是一个基于特点 mock 数据的 DSL 示例：

### 示例

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
