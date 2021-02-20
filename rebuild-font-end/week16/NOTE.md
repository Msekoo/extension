# create and dispatch DOM events

`

  const event = new Event('eventName');
  DOMelem.addEventListener('build', (e) => {}, false)
  DOMelem.dispatchEvent(event);

`

# add data to the event object

`

  const event = new CustomEvent('eventName', {detail: DOMelem.dateset.data});
  DOMelem.addEventListener('build', (e) => {e.detail}, false)
  DOMelem.dispatchEvent(event);

`

# Event bubbling

`

  const event = new CustomEvent('eventName', {
      bubbles: true,
      detail: DOMelem.dateset.data
    });

`

# create and dispatching events dynamically

`

  DOMelem.addEventListener('build', (e) => {
    this.dispatchEvent(new CustomEvent('evetName', { bubbles: true, detail: { ... } }))
  }, false)

`

* 触摸屏幕下 document.ontouchstart 为null

