listy
=====

I'm a tiny jQuery plugin which aim to facilitate developer making lists browsable through keyboard.

I just do the list stuff and let the developer do whatever he want to do when user select anything in the list.

Demo: http://lou.github.io/listy/

Usage
-----

html:
```html
  <ul class='listy'>
    <li>elem 1</li>
    <li>elem 2</li>
  </ul>
```

javascript:
```javascript
  $('.listy').listy({
    actions: {
      select: {
        method: function(elem){
          elem.addClass('select');
        },
        keys: [13, 32],
        events: 'click dblclik'
      }
    }
  });
```

css:
```css
  ul{
    position: relative;
    overflow-y: auto;
    height: 200px;
  }
```

Options
-------

**actions**:
Object where you can define actions you want to fire when specified keys and/or events are triggered.
You can define as many actions as you want.

example:
```javascript
  actions: {
    // the following method will be fire
    // when user click/dblclick on elem
    // or press keys 13,32 (space, enter)
    yourCustomMethod: {
      method: function(elem){
        elem.doSomethingCool();
      },
      keys: [13, 32],
      events: 'click dblclick'
    }
  }
```

* **upKeys**: keys code for the up action (default: [38] | type: Array)
* **downKeys**: keys code for the down action (default: [40] | type: Array)
* **inactive**: jQuery selector for the non-selectable items (default: '.muted' | type: String)
* **element**: jQuery selector for the items (default: 'li' | type: String)
