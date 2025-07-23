package com.zidio.zidioBackend.entity;

public class MessageOrdering {
    public static void main(String[] args) {
        Sender.setOutput("");
        Sender sender = new Sender();

        Thread t1 = new Thread(() -> sender.send("Hi"));
        Thread t2 = new Thread(() -> sender.send("Bye"));
        
        t1.start();
        try {
            t1.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        t2.start();
        try {
            t2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println(Sender.getOutput());
    }
}

