# CO2 Emissions Data App

## Performance Profiling and Project Structure Constraints

**React DevTools Profiler** is used to measure the performance of the app.

According to the component structure of this project, there is only one place where adding memoization is truly useful: preventing the **table** component from re-rendering when opening the column selection modal.

First of all, I have the **Control Panel** compoment where all inputs and buttons to control the table are placed, so clicking on the particular input will call **Control Panel** function because and chnge the appearence of the panel.

But let’s examine the performance for all interactions with the table.

### Before adding memoization

- Sorting the table

![alt text](./public/screenshots/image.png)
![alt text](./public/screenshots/image-1.png)

- Searching for country name

![alt text](./public/screenshots/image-2.png)
![alt text](./public/screenshots/image-3.png)

- Select the other year

![alt text](./public/screenshots/image-4.png)
![alt text](./public/screenshots/image-5.png)

- Interaction with the columns selecting modal

![alt text](./public/screenshots/image-6.png)
![alt text](./public/screenshots/image-7.png)

### After adding memoization

- Sorting the table

![alt text](./public/screenshots/image-8.png)
![alt text](./public/screenshots/image-9.png)

- Searching for country name

![alt text](./public/screenshots/image-10.png)
![alt text](./public/screenshots/image-11.png)

- Select the other year

![alt text](./public/screenshots/image-12.png)
![alt text](./public/screenshots/image-13.png)

- Interaction with the columns selecting modal

![alt text](./public/screenshots/image-14.png)
![alt text](./public/screenshots/image-15.png)

### Summary

As we can see, memoization helps prevent the table component from re-rendering when interacting with the modal component. This works because the modal state does not affect the table’s props or dependencies, so the table is not re-rendered unnecessarily.
