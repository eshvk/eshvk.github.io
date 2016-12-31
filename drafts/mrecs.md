Recommendations : A Survey. The big data needs of libraries. 


Question: How do I get you stuff you may like? 

In some ways this is a search/relevance problem. In some ways this is a recommendation problem. Both of those are really incredibly related problems. [schafershilad] talks about the origins of CF; how the original problem of sifting through text documents got harder and harder as content based techniques broke down. CF on the other hand exists always; I do CF when I send content to my friend specifically. Hell, the stereotypical republican relative is doing CF (push based) when she sends content on Obama. 

## Collaborative Filtering

The central idea is to "Filter" out the things that a user will like based on his/her collaborative liking of other things that other users like. In other words, two users have the same opinion on a certain topic implies that their opinion on another topic might be identical.

Another core idea mentioned in MMDS is the long tail. In a more information theoretic fashion, what is most interesting. Not necessarily the most popular. 

### Issues

#### Similarity Computation

- How do you model similar users? This is important because you have sparsity (missing values), incredibly popular items (can skew data) ? 

##### Similarity Metrics

- The metric function used to decide on similarity has unintentional effects. Jaccard Similarity for example works on the basis of looking at how much overlap there is between two sets. This seems intuitive enough. You can translate this into a metric distance by doing a 1- Sim(x,y). However, this is not perfect: suppose you have a user Alice and another user Bob. Bob loves Neil Gaiman novels; he has read two books. Good Omens and Coraline. Alice hated Good Omens. Their Jaccard distance would be 0.5. However, consider Betsy who loved Good Omens, Coraline and also has highly rated ten Discworld novels. The Jaccard distance between Bob and Betsy is 0.8. This is odd for two reasons:

a) Arguably Betsy is a closer match to Bob because she and he like the things that they have commonly rated. This information is lost. 

b) Another thing that appears interesting is the situation of sparsity. You have more information in the Betsy, Bob case; not really in the Alice, Bob case which messes up the distance. 

- So how do we fix this? One approach would be to treat "hatred" or "low" ratings as not even rating the book. So Alice and Bob would have a J-Distance of 1 while J(Bob,Betsy) = 0.8. So they are closer than Alice and Bob. 

- We could use a different metric distance; say cosine distance which is the angle between the two vectors. 

TODO: MMDS states that the use for cosine distance is in spaces that have a concept of dimension like Euclidean space. Furthermore, they also make sense in a space that are similar to Euclidean spaces: binary dimensions, integer ratings. Why? Why does it make sense in these specific situations? 

Nonwithstanding above issue, an intriguing point is to understand how to merge dimensions with differing scales together. Say you have information that Alice loves Terry Pratchett books which have Vimes in them and also has a 2 star rating for Good Omens. How do you merge this information with Bob who also loves (binary 1-0) Vimes books and has a 5 star rating for Good Omens and a 4 star rating for Coraline. Cosine similarity gives you a naive way of combining these ratings. However, this brings into the problem of side-effects. Maybe, Bob is an excitable character who rates every book pretty damn high. Maybe, all the users have a certain average rating that they give books. Maybe Good Omens is one of those books that gets high ratings for everyone. So in essence the rating can be decomposed into several factors. The global rating, the local biases inherent to that user. Scaling from the cosine similarity sense is equivalent to normalization or removing these biases to identify the core issues. 

TODO: I need to drill this further. For example, is it possible to build a regression model for all the biases as a feature vector. I see this as a way of me not having to deal with the data, but is there any other advantage? What are possible disadvantages of this approach? 


TODO: How do you define a concept of similarity for things like genre information? Do you define a similarity between related genres? How do you even do such a thing? For example, how do you assert that crime and mystery are closer than crime and comedy? Is there a principled way of doing this? 

Note that there is a way of getting around this in the case when we allow multiple labels. If something could be crime and comedy, you could essentially have a boolean membership for crime, comedy and so on. Yet, this feels grossly unsatisfying from the perspective of combining this and the previous problem. 

TODO: Look at the problem from a classification perspective. How do people do classification when features are categorical? I suppose one approach is random forests. [rfechen] explains them clearly. I used to think a random forest was a computer program. Go through the list of stuff you like, based on that do a prediction; that troubles me. Because it is not stochastic. So bring stochasticity. Use multiple decision trees that work on different subsets of the data and then combine them. 


###### More insights on metrics

- Inner Product. The inner product is high when both of the individual values in the vectors are sort of similar. It is however unbounded. Furthermore, the value is highly dependent on where the vectors lie in space. 

- Cosine Similarity. This is inner product divided by product of L2 norms of the two vectors. This is bounded between -1 and 1. 

- Pearson's correlation coefficient. This is invariant to shifts. The way to do that is to subtract each vector from the mean of that vector before taking the inner product and normalizing it. 

- Adjusting cosine similarity. One problem with cosine similarity from the user is the fact that different users may have different scales of rating, we can adjust for this by subtracting from every user, the average rating of that user.

On an aside, Ordinary Least Squares. In ordinary least squares, we try to minimize the error so as to find the best estimate for the parameters of a line (slope, intercept) that fit a given dataset. The slope equation is in essence the inner product of the x and y vectors (mean shifted), normalized only on the x side. 


#### How do you decide how to exploit the Utility matrix? 

This is a subtle issue: The Utility matrix is the User-Item matrix of things that Users bought or liked or whatever metric we are using. We could use this to find for every users similar users and then go ahead and find items that they have liked that the original user has not. 

##### User vs Item 

Reading about CF indicates that there are two approaches in which this problem can be tackled. One is trying to find like minded users to a given user and then use their new likes as potential likes for this user. Another is to find similar items to a given item (similar by user liking this item also liking the other item). Then recommending such similar items to a user. Now, most papers prefer this approach and claim it is more scalable. I am not sure why? The reason from what I understand is as follows:

- More users than items.

- Less information per user to identify other users similar to a given user. More user per item conversely. A weaker argument, I know. MMDS expands on this. They say that it is mainly because it is easier to find similar items or rather items that belong to the same genre but the same is not true for two users: just because you and I like climbing doesn't mean we are similar. 



### General Approaches

#### Search

For a given user, the problem then boils down into finding items that they would possibly like. In Linear Algebraic terms, there are two ways of doing this. We could construct vectors for users and items in the same space, then find the closest items that the user is similar to and then filter out the items the user has already seen.

One way of doing this practically is LSH that helps figure out which bucket to search within. Another approach is to cluster items into larger groups, then use that to do the search efficiently. I suppose things like genre information could help in this clustering process. 




#### Matrix Decomposition

Considering the entire problem as filling in values in a missing value matrix. This is what spotify does. Now, you would have to do UV decomposition of the utility matrix inorder to find the U and V that make up the matrix. The way you would do this is to do gradient descent. Initialize U and V with some arbitrarily values and optimize for RMSE. Now, there might be several local minima. There could be overfitting (regularization to avoid that). Furthermore, the size of the matrix itself could be so large that one can't do gradient descent using all the values. 

Note that this is in some sense posing the problem as a classification problem, except that you are both finding the feature values and the weight values simultaneously whilst fixing only the number of dimensions. 

QUESTION: Why do Matrix factorization as opposed to LSH? Or nearest neighbor searches? 

## Content based approaches

 One way is to treat the Utility matrix as a rating matrix and constructing item feature vectors and then computing user preference vectors by treating this as a classification problem. (On second read this statement makes no sense. How does one construct item feature vectors without computing user preference vectors (a la SGD)?)

 The random forest approach however could be one content based approach. 



## Ensemble Clustering

Merging a bunch of weak recommendation techniques together to build a more sophisticated model. 

## Status

- Read more here: http://www.slideshare.net/liorrokach/recommender-systems-13809014

- Collect all the references mentioned in page 339 of MMDS and use them to learn more. 

- Try to combine this into a conversation about music recommendations, mmds and your own local dataset on books. Open source the latter related work. Try to maybe acquire a good reads dataset. Libraries dataset? 




Music Recs: Survey, Review : 



Pandora's Music Genome Project:

1. http://www.thestreet.com/story/12059828/1/how-pandoras-music-genome-could-fail-against-the-likes-of-apple.html

A. Who is Rocco Pendola? 

B. 


2. http://musically.com/2013/11/26/interview-moby-spotify-bittorrent/

"When I was first shown Pandora and those early algorithms, I was pretty impressed by it. Generally I trust people, but with some of these algorithms it is pretty disconcerting as they are making recommendations that are surprisingly relevant. I read a lot of books on Kindle, but the Kindle recommendation algorithm is so damn ass-backwards. For example, if you read a book by Lee Childs the Kindle algorithm recommends a book by Lee Childs.

Some music algorithms are surprisingly accurate and relevant, but at the end of the day what they don’t have is the arbitrary and surprise element that humans have. If I am listening to my favourite college radio station, the DJ might play a Black Flag song followed by a Bon Iver song followed by a Frank Sinatra song followed by some obscure minimalist techno.

The fantastic arbitrary aspect of it is the one thing that none of the streaming algorithms can do. As much as I love Hank Williams, sometimes it’s really nice to have a Hank Williams song followed by a Pantera song."


I think this is not about having an arbitrary recommendation but having whimsy incorporated into it. Whimsy that is a more sophisticated model. 


3."A Matrix Factorization Algorithm for Music Recommendation using
Implicit User Feedback" 

http://mpacula.com/publications/lastfm.pdf

This is an interesting paper. So the crux of the idea here is: How do you do CF with only implicit ratings? Prior to that he brings up a few issues. One, how does CF recommendations work currently. SGD is one approach used to obtain the latent feature vectors. Now, how does one work in the setting where one only has implicit ratings. Apparently, one approach is to convert the implicit ratings into an explicit rating. With a confidence interval for the fact that we are not certain that this is indeed the user's rating. For some reason that is not clear to me, this approach makes the CF matrix dense preventing SGD from being worked. So they develop an alternate approach. Another interesting issue that I saw was how the distribution of implicit ratings looks like. It is a power distribution with most users having played a very few artists. I think (haven't read the paper that thoroughly) that this means that the amount of recommendations you can do with greater certainity are low. In essence, you have more samples for some supports of the distribution. Not, for others. 

4. "Deep content-based music recommendation"
https://dl.dropboxusercontent.com/u/19706734/deep_content_based_music_recommendation.pdf

5. "Layman's Introduction to Random Forests"
http://blog.echen.me/2011/03/14/laymans-introduction-to-random-forests/


Spotify Project:

1. Understand the spotify infrastructure.

a) understand tech stack

b) understand dev/dep tools that spotify uses. 


TODO: Refer Eric Hoffert's email. 


2. Understand current machine learning stack.


a) Refer original Erik Bernhardsson material. 

b) http://www.slideshare.net/erikbern/mlhadoop-nyc-predictive-analytics-2

c) Read Erik's rejected paper. 


3. New project ideas: TV Recommendations

a) Overarching high level ideas: 

Need to leverage CF + Content work + Human annotations. 

Questions: 

1. How valid is the current human annotation data? 

2. Assuming it is not "that valid", what does that mean? 

b) Leveraging current music CF framework. 

Is there a reliable way of extracting music metadata from a tv show? 

TODO: extract music fingerprint from video and match music fingerprint use the music CF. 

c) Other exploratory goals: 

1. How does Youtube's video recommendation platform work? 

2. How does Bluefin Analytics do it? Do some research on Deb Roy's work. 

3. TODO: Ask Eric H if he can send you the presentation. 




Trip to NYC:


TODO 

1. Do research on movers. Mel's material? Atlas Van Lines, National VAn Lines. DONE

2. Ship all important documents safely to ATX, valuables. 

3. Cancel Koret center membership. 

4. Raise hell on Monday: Ping Gigi, Lisa, Eric/Erik reg. the mover thing. DONE

5. Reject AAPL. DONE

6. Set an appointment for Vangard. DONE

7. Find out what stuff you left in ATX. What do you actually need?  POTENTIALLY 2 BOOKS. N/A

8. Buy an external harddrive, some sort of backed up storage solution. Then, copy and send that to Austin too. Chuck it. 

9. Call Ajai and ask reg. interstate moving. DONE

10. Reg. Naga, talk at NYC Spotify on automatic playlist recommendation. Email Eric, Erik and cjohnson@spotify.com


Bills:

1. Charge trip to Houston + trip from Austin to NYC. 

2. Charge shipping docs from CA -> ATX -> NYC

3. Koret cancellation charges? none

4. Deposit loss charges? hmmm

5. Hotel charges

6. $120 tips for movers 

7. $5 + $5 tips moving from Austin to NYC.





Living: 

1. How do neighborhoods in NYC map to SF? E.g. Mel says I should live in the Upper West Side. Is that a valid assertion? Why does Chris live where he lives? 

2. How does travel work? What commuter pass thingmajigs do I need? 

3. How do you establish residency ASAP? 

4. 


Talking to the UT person on his research gave me a couple of ideas. 


1.  I know Spotify uses Facebook information for login details but I don't know much about whether the social graph itself is used to improve the Collaborative Filtering network. To be specific, consider that User - Song rating matrix can be considered as the adjacency matrix of a bipartite graph: No links between user nodes explicitly but links existing between Users and Songs. Now, if you have some social network information, you have User - User links. This in essence means that you can soup the Collaborative Filtering network by adding this information in a principled manner to get better recommendations. The paper (attached) shows how his research accomplished that. 


2. Another idea into one feature which again depends on how current implementations at Spotify work is 




 http://www.cs.utexas.edu/~inderjit/public_papers/app_recommendation_recsys13.pdf



for the potential talk gave me some insights into one possible feature we could possibly think about (distinct from the video project). Specifically, shuffles. Right now, the way shuffling works in Spotify's playlists looks randomized. (I presume nothing more sophisticated than a fisher yates shuffle but I could be wrong.). However, what if you could actually 

why can't you collaboratively recommend a tvshow that a group of people would watch?  


Moving from SF

1. Pack Do this on Wednesday. Documents, except for Passport and Green Card, Jewelry. Photos, Yubikey, Clothes. Some gym clothes.  

2. Get a hotel for Thursday night, Friday night, Sat, Sun and Monday

3. Cancel Gym membership. DONE

4. Call up Naga and find out how fedex moving worked. DONE

5. Do fedex moving. 

6. Get laundry clothes DONE

7. Collate list of all things, send it to the woman. NOT DONE

8. Tell the lady about Chelsea place.  DONE

9. Book a flight from SF

10. Send bills to Enthought. DONE

11. Reject enthought.  DONE

12. Collect all documents, then print out the ACH form, add a voided check. 

25 stanyan street

fedex office print and ship center: 1967 market st, san francisco, ca 94103 415-252-0864

26. Updating Financial Instruments: Can't update address at Fidelity without contacting SU. How to roll it over? (Have updated to Austin Vangard, American Express, SF Fire, UFCU)


Stuff:

14 pictures. 

Books

Har disk

Headphone

Selphy printer
shaver
grinder
iron
mixer
cooker
slow cooker
hair dryer
suitcase with clothes
clothes
shoes
stuff (ipod, etc)
measuring scale
3 lamps
two pillows
1 small table
1 desk
1 bed
1 knife
pyrex 4 large square, 1 small square, 1 smaller square, 2 small, 2 big rounds, 1 measuring cup
roller
climbing gear
backpack
measuring cups metal
measuring spooons
george foreman grill


Bouncer Neville Li social interactions


More Like This: Similar to an item. 

evergreen, trending we can get around this problem

ranking of genres. 

http://research.google.com/pubs/pub36697.html

http://research.google.com/pubs/MachinePerception.html

http://research.google.com/pubs/pub41422.html


http://static.googleusercontent.com/media/research.google.com/en/us/pubs/archive/35651.pdf
http://static.googleusercontent.com/media/research.google.com/en/us/pubs/archive/37391.pdf

http://static.googleusercontent.com/media/research.google.com/en/us/pubs/archive/41403.pdf


http://labrosa.ee.columbia.edu/

http://www.ee.columbia.edu/~dpwe/e4896/outline.html music signal processing

http://www.ee.columbia.edu/~dpwe/muscontent/ music ml


[mmds] 

[echenrec](http://blog.echen.me/2011/10/24/winning-the-netflix-prize-a-summary/)

[sukoshgoftar] ( A Survey of Collaborative Filtering Techniques (Refer cf_survey.pdf))

[schafershilad] ( Collaborative Filtering Recommender Systems ) (Refer cf_surveys.pdf)



http://blog.stevekrause.org/2006/01/pandora-and-lastfm-nature-vs-nurture-in.html

then read this:

http://blog.stevekrause.org/2007/04/do-you-like-what-you-like-because-you.html

http://www.math.utexas.edu/users/pmueller/class/422.html 
(Peter mueller he wrote nonparametric bayesian models)

http://www.nytimes.com/2007/04/15/magazine/15wwlnidealab.t.html?ei=5070&en=5ba0d83ad63b36fe&ex=1177646400&pagewanted=print
http://www.viralnova.com/amazing-places/ sweden to visit


dynamic and personalized data
http://www.readability.com/read?url=http%3A//donmilleris.com/2010/03/24/the-best-books-on-writing/
indian buffet process: http://mlg.eng.cam.ac.uk/pub/pdf/GriGha11.pdf
shit to read: http://arxiv.org/pdf/1206.2944.pdf
http://work.caltech.edu/library/#!?goback=.gde_35222_member_5810981726511443971
http://cocosci.berkeley.edu/tom/papers/tutorial.pdf
http://www.cs.umd.edu/~hardisty/papers/gsfu.pdf

http://statweb.stanford.edu/~ckirby/techreports/BIO/BIO%2083.pdf

http://ask.metafilter.com/249892/How-is-life-in-San-Francisco-different-from-life-in-New-York-City
http://ask.metafilter.com/35676/East-Coast-vs-West-Coast-stereotypes
http://static.googleusercontent.com/external_content/untrusted_dlcp/research.google.com/en/us/pubs/archive/36180.pdf

http://citeseerx.ist.psu.edu/viewdoc/download;jsessionid=52A3B869596656C9DA285DCE83A0339F?doi=10.1.1.146.4390&rep=rep1&type=pdf

https://dl.dropboxusercontent.com/u/19706734/deep_content_based_music_recommendation.pdf


Read more: http://www.cracked.com/blog/6-harsh-truths-that-will-make-you-better-person/#ixzz2mSp0925r



