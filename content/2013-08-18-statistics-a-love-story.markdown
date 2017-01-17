---
layout: post
title: Statistics: A love story
date: 2013-08-18 22:26
categories: 
published: true
article_order: 2
---

Remember that feeling? That feeling you get when you have something stuck between your teeth. You claw at it; you use a toothpick which breaks. Useless efforts. Annoying. You hope it goes away. It does eventually; the world feels right again. You don't even notice the moment it disappeared. Yet, those minutes, hours were awful.    

That was physics for me. It was mainly the experiments, we read these big, important books about fancy theories. We then spent a few hours every week running experiments. Experiments measuring gravity or some other bullshit. The big books said that free fall acceleration, gravity ($g$) was $9.8$ $m/s^2$. That wasn't the case in those experiments. I thought it was because of the way we did things. You were given shitty equipment. You repeated each experiment ten times, you wrote down the numbers, you found the average. You hoped the value was close to the book value. It never was; that worried me.   

It also was an academic problem. Mainly because of her. I still remember her. She was obese, violent with a temper -- the physics lab teacher. She would pick up my lab notebook, circle a few numbers with that angry red pen. She would always fling the notebook on the floor. Sometimes, she would call me a "duffer"; she would point at the "good kids". They got the right values. She might even cuff me on the head. Then, I would have to go repeat those experiments, the "bad ones". 

I rarely repeated the experiments. After a while, I rarely even did them the first time around. I made up numbers. Numbers such that the mean was close to the "true value". We were both wrong. I believed in a magical world where amazing tools existed to get perfect results. She believed that some results were bad and could be thrown away. We both believed that not getting a correct value for $g$ was a bad thing. It is okay, though. We were repeating a cycle. A cycle of mistakes that smarter people had made, for centuries, far away from that cargo-cult physics class in a high school in India. 

Until today, I didn't realize that awful feeling had left me. Left me long ago. I am reading a very odd book. [The Lady Tasting Tea][ladytea] explains statistics for the layman; yet it addresses deep philosophical issues about the nature of science. Things that trigger the old memory. 

> ... all experiments are sloppy and that very seldom does even the most careful scientist get their number right. 

> ... we do not look upon experimental results as carefully measured numbers in their own right. Instead, they are examples of a scatter of numbers, a distribution of numbers can be written as a mathematical formula that tells us an observed number will be a given value.  

In [Bridget Jones's Diary][bjdiary], Bridget Jones weighs herself every day. She records this in her diary. Depending on the day, she is either ecstatic or devastated. The book meanders on and on about this. Unfortunately for her, she is looking at random reflections of her true weight. Even if she weighed herself hundred times a day, all she would get would be a sample of a probability distribution. A mathematical abstraction that has hidden knowledge about her weight. This is like being given a few solved chunks of a big jigsaw puzzle. She doesn't have the full puzzle. She never will. All she can do is make a good guess at the big picture. This is where Statistics helps. Sometimes, I can find out which jigsaw puzzle I am working with. Every probability distribution has clues that identify it. The mean tells me the center of this distribution; the central number around which all of Bridget's weights spread out. The variance tells me how far the numbers vary from this center of the distribution. Is it possible that Bridget will wake up someday and see 25 pounds? 300 pounds ?

<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<link rel="stylesheet" type="text/css" href="/stylesheets/bridget.css"> 

<script src="/javascripts/bridgetjones/bridget.js" charset="utf-8"></script>
<div id="bridgetchart" style="text-align: center !important;">
<div id="caption" class="hidden" ><p><span id="value">100</span></p></div>	
</div>

It gets harder. You can never really know the mean or the variance either. All you are getting from your set of measurements is a sample, a sample from all the sets of measurements. Getting back to Bridget and her hundred weighings a day, imagine the space of all possible hundred weighings a day that could happen. All the variations. Every timeline giving you a mean, each mean a clue to the original mean of Bridget's weights. Yes, it is randomness all the way down. 

My experimental value for $g$ was just a sample. The sample mean was an estimate for the true value of $g$. There are ways to prove that if I keep repeating those experiments; those awful experiments that I didn't like, I would get have a high probability of getting something closer. Not a guarantee. Just maybe. That is what Statistics gives you. A way of dealing with the mad, mad crazy world out there. I realize I am in love. _See [here][bjviz] for more a detailed analysis of her weight._

[ladytea]: http://www.amazon.com/gp/product/0805071342/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=0805071342&linkCode=as2&tag=meditations02-20
[bjdiary]: http://www.amazon.com/gp/product/0143117130/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=0143117130&linkCode=as2&tag=meditations02-20
[bjviz]: http://nbviewer.jupyter.org/github/eshvk/bridget_jones_diary/blob/master/Bridget%20Jones%20Diaries.ipynb