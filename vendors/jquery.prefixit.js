$.fn.prefixit = function(props)
{
  for (k in props)
  {
    v = props[k];
    this.css( "-webkit-" + k, v);
    this.css( "-moz-" + k, v);
    this.css( "-o-" + k, v);
    this.css( k, v);
  }
}
