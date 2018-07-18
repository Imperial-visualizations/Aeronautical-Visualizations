clear
clc
close all

fileID = fopen('fuselage.txt', 'r');

for i = 1:306
    read(i,:) = fscanf(fileID, '%f %f %f %f', 4);
end

xFUS = read(:,2);
yFUS = read(:,3);
zFUS = read(:,4);

fclose(fileID)

plot3(xFUS,yFUS,zFUS,'kx')    
axis('equal')

fileID = fopen('wing.txt', 'r');

for i = 1:834
    read(i,:) = fscanf(fileID, '%f %f %f %f', 4);
end

xWing = read(:,2);
yWing = read(:,3);
zWing = read(:,4);

fclose(fileID)

figure
plot3(xWing,yWing,zWing,'kx')    
axis('equal')
