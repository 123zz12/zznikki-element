## 功能点设计 [GNSJ] 组件库按钮组件

### 功能描述
按钮组件应提供以下功能：
- 多种样式类型（`type`），包括默认、主要（`primary`）、成功（`success`）、警告（`warning`）、危险（`danger`）、信息（`info`）等。
- 支持三种尺寸（`size`）：大（`large`）、默认、小（`small`）。
- 支持禁用状态（`disabled`），用户无法点击。
- 支持加载状态（`loading`），可自定义加载图标（`loading-icon`）。
- 支持图标按钮，可通过`icon`属性设置图标。
- 支持圆形按钮（`circle`）、圆角按钮（`round`）。
- 支持按钮组（`<er-button-group>`），可对多个按钮进行分组管理。
- 支持节流模式（`use-throttle`），避免频繁点击导致的性能问题。
- 支持自定义元素标签（`tag`），如`button`、`div`、`a`等。

### API 设计
#### Props
| Name          | Description                                                                 | Type                                                                 | Default       |
|---------------|-----------------------------------------------------------------------------|----------------------------------------------------------------------|---------------|
| size          | 按钮尺寸（`large`、`default`、`small`）                                     | `enum` ('large', 'default', 'small')                                 | `default`     |
| type          | 按钮类型（`primary`、`success`、`warning`、`danger`、`info`）               | `enum` ('primary', 'success', 'warning', 'danger', 'info')           | `info`        |
| plain         | 是否为朴素按钮                                                              | `boolean`                                                            | `false`       |
| round         | 是否为圆角按钮                                                              | `boolean`                                                            | `false`       |
| circle        | 是否为圆形按钮                                                              | `boolean`                                                            | `false`       |
| loading       | 是否为加载中状态                                                            | `boolean`                                                            | `false`       |
| loading-icon  | 自定义加载中状态图标组件                                                    | `string`                                                             | `spinner`     |
| disabled      | 按钮是否为禁用状态                                                          | `boolean`                                                            | `false`       |
| icon          | 按钮图标                                                                    | `string`                                                             | -             |
| autofocus     | 是否自动聚焦（原生`autofocus`属性）                                          | `boolean`                                                            | `false`       |
| native-type   | 原生`type`属性（`button`、`submit`、`reset`）                               | `enum` ('button', 'submit', 'reset')                                 | `button`      |
| tag           | 自定义元素标签（如`button`、`div`、`a`）                                    | `string` / `Component`                                               | `button`      |
| use-throttle  | 是否使用节流模式                                                            | `boolean`                                                            | `true`        |
| throttle-duration | 节流模式下，节流时间间隔（ms）                                            | `number`                                                             | `500`         |

#### Events
| Name    | Description                     | Type                                      |
|---------|---------------------------------|-------------------------------------------|
| click   | 按钮点击事件                    | `(event: MouseEvent) => void`             |

#### Slots
| Name      | Description                     |
|-----------|---------------------------------|
| default   | 默认插槽，按钮内容               |
| loading   | 自定义加载图标                   |

#### Expose
| Name      | Description                     | Type                                      |
|-----------|---------------------------------|-------------------------------------------|
| ref       | 按钮HTML元素                    | `Ref<HTMLButtonElement>`                  |
| size      | 按钮尺寸                        | `ComputedRef<'' | 'small' | 'large'>`     |
| type      | 按钮类型                        | `ComputedRef<'' | 'primary' | ...>`        |
| disabled  | 按钮禁用状态                    | `ComputedRef<boolean>`                    |

### 交互关系
1. **正常状态**：
   - 用户点击按钮时，触发`click`事件。
   - 如果按钮处于禁用状态（`disabled`为`true`），点击事件不会触发。
2. **加载状态**：
   - 当`loading`为`true`时，按钮显示加载图标，用户无法点击。
   - 用户可以通过`loading-icon`属性自定义加载图标，或通过`loading`插槽自定义加载状态的内容。
3. **节流模式**：
   - 当`use-throttle`为`true`时，按钮点击事件会在指定的节流时间间隔（`throttle-duration`）内限制触发频率。
   - 如果`use-throttle`为`false`，点击事件不会受到节流限制。
4. **按钮组**：
   - 使用`<er-button-group>`组件对多个按钮进行分组。
   - 按钮组可以设置统一的`size`、`type`、`disabled`属性，影响组内所有按钮。
5. **自定义元素标签**：
   - 通过`tag`属性，用户可以将按钮设置为不同的HTML元素，如`div`、`a`等。
   - 如果设置为`a`标签，可以通过`href`属性设置链接地址。

### 功能实现细节
1. **样式实现**：
   - 使用CSS预处理器（如Sass）定义按钮的样式，通过`type`、`size`、`plain`、`round`、`circle`等属性动态生成不同的样式。
   - 为每种按钮类型（如`primary`、`success`等）定义不同的背景颜色、边框颜色等。
   - 为禁用状态的按钮设置较低的透明度，并禁用鼠标点击事件。
2. **加载状态实现**：
   - 使用CSS动画或SVG图标实现加载效果。
   - 如果用户提供了`loading-icon`属性或`loading`插槽内容，则优先使用用户自定义的加载图标。
3. **节流模式实现**：
   - 使用JavaScript的节流函数（如`_.throttle`或自定义节流逻辑）限制按钮点击事件的触发频率。
   - 在按钮组件内部维护一个节流状态，确保在节流时间间隔内不会重复触发点击事件。
4. **按钮组实现**：
   - `<er-button-group>`组件通过包裹多个`<er-button>`组件来实现分组功能。
   - 为按钮组内的按钮设置统一的样式和行为，如统一的边框、间距等。
5. **自定义元素标签实现**：
   - 根据`tag`属性动态渲染不同的HTML元素。
   - 如果`tag`为`a`，则需要处理`href`、`target`等属性，确保按钮可以作为链接使用。

### 用户操作流程
1. **初始化按钮**：
   - 用户通过`<er-button>`标签创建按钮，并通过`type`、`size`等属性配置按钮样式。
   - 用户可以通过`icon`属性添加图标，或通过`loading`属性设置加载状态。
2. **使用按钮组**：
   - 用户通过`<er-button-group>`标签创建按钮组，并将多个`<er-button>`组件包裹在其中。
   - 用户可以为按钮组设置统一的`size`、`type`、`disabled`属性。
3. **禁用按钮**：
   - 用户将`disabled`属性设置为`true`，按钮将显示为禁用状态，用户无法点击。
4. **加载按钮**：
   - 用户将`loading`属性设置为`true`，按钮将显示加载状态，用户无法点击。
   - 用户可以通过`loading-icon`属性或`loading`插槽自定义加载图标。
5. **点击按钮**：
   - 用户点击按钮时，触发`click`事件。
   - 如果按钮处于禁用状态或加载状态，点击事件不会触发。
   - 如果按钮启用了节流模式，点击事件将在指定的时间间隔内限制触发频率。

### 异常处理
1. **无效属性值**：
   - 如果用户提供了无效的`type`、`size`等属性值，组件应忽略无效值并使用默认值。
2. **禁用状态下的点击事件**：
   - 如果按钮处于禁用状态，点击事件不会触发，避免用户误操作。
3. **加载状态下的点击事件**：
   - 如果按钮处于加载状态，点击事件不会触发，避免用户重复操作。
4. **节流模式下的频繁点击**：
   - 如果按钮启用了节流模式，组件应限制点击事件的触发频率，避免因频繁点击导致的性能问题。